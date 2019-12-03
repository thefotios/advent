from dataclasses import dataclass, field
from functools import reduce
from itertools import chain, product, takewhile
from typing import Callable, Iterable, List, Set, Tuple, cast

from helpers import get_input, pairwise

Point = Tuple[int, int]


def location_range(start: int, end: int) -> Iterable[int]:
    """Creates a range that covers the specified start and end points (inclusive)

    >>> list(location_range(0, 5))
    [0, 1, 2, 3, 4, 5]

    >>> list(location_range(5, 0))
    [5, 4, 3, 2, 1, 0]
    """
    step = 1
    if start > end:
        step = -1

    return range(start, end + step, step)


@dataclass
class Movement:
    direction: str
    amount: int
    start: Point = (0, 0)
    end: Point = field(init=False)

    magnitude: int = field(init=False, default=1, repr=False)
    axis: str = field(init=False, repr=False)

    def __post_init__(self) -> None:
        if self.direction in ("L", "D"):
            self.magnitude = -1

        if self.direction in ("R", "L"):
            self.axis = "x"
        else:
            self.axis = "y"

        self.end = self._get_end()

    @property
    def points(self) -> Iterable[Point]:
        """ Returns a list of all points this Movement covers

        >>> list(Movement(direction='U', amount=5).points)
        [(0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5)]

        >>> list(Movement(direction='D', amount=5).points)
        [(0, 0), (0, -1), (0, -2), (0, -3), (0, -4), (0, -5)]
        """
        x, y = map(lambda x: location_range(*x), zip(self.start, self.end))
        yield from product(x, y)

    def _get_end(self) -> Point:
        """Determines the endpoint

        >>> Movement(direction = 'R', amount=10).end
        (10, 0)

        >>> Movement(direction = 'L', amount=10).end
        (-10, 0)

        >>> Movement(direction = 'U', amount=10).end
        (0, 10)

        >>> Movement(direction = 'D', amount=10).end
        (0, -10)
        """
        amount = self.amount * self.magnitude

        movement = [0, 0]
        if self.axis == "x":
            movement[0] = amount
        else:
            movement[1] = amount

        return cast(Point, tuple(map(sum, zip(self.start, movement))))


def parse_line(line: Iterable[str]) -> List[Movement]:
    """Generate list of points and determine their locations

    >>> a, b = parse_line(['R10', 'U5'])
    >>> a
    Movement(direction='R', amount=10, start=(0, 0), end=(10, 0))
    >>> b
    Movement(direction='U', amount=5, start=(10, 0), end=(10, 5))
    """

    def make_point(acc: List[Movement], x: Tuple[str, int]) -> List[Movement]:
        direction, amount = x
        cur = Movement(
            direction=direction,
            amount=amount,
            start=acc[-1].end if len(acc) else (0, 0),
        )
        return [*acc, cur]

    points = []  # type: List[Movement]

    return reduce(make_point, [(x[0], int(x[1:])) for x in line], points)


@dataclass
class Wire:
    line: Iterable[str] = field(repr=False)
    movements: List[Movement] = field(init=False)

    def __post_init__(self) -> None:
        self.movements = parse_line(self.line)

    def intersections(self, b: "Wire") -> Set[Point]:
        """
        >>> a = Wire(['R8','U5','L5','D3'])
        >>> b = Wire(['U7','R6','D4','L4'])
        >>> a.intersections(b)
        {(3, 3), (6, 5)}
        """
        return set(self.locations) & set(b.locations) - set([(0, 0)])

    @property
    def locations(self) -> Iterable[Point]:
        """
        >>> a = Wire(['R2','U1','L3','D1'])
        >>> list(a.locations)
        [(0, 0), (1, 0), (2, 0), (2, 0), (2, 1), (2, 1), (1, 1), (0, 1), (-1, 1), (-1, 1), (-1, 0)]
        """

        points = chain(*(x.points for x in self.movements))
        return points

    def movements_to(self, dest: Point) -> Iterable[Point]:
        """
        >>> a = Wire(['R2','U1','L3','D1'])
        >>> list(a.movements_to((2, 1)))
        [(0, 0), (1, 0), (2, 0), (2, 0), (2, 1)]
        """

        return chain(takewhile(lambda x: x != dest, self.locations), [dest])

    def steps_to(self, dest: Point) -> int:
        """
        >>> a = Wire(['R8','U5','L5','D3'])
        >>> b = Wire(['U7','R6','D4','L4'])
        >>> p1 = (3, 3)
        >>> a.steps_to(p1)
        20
        >>> b.steps_to(p1)
        20
        >>> p2 = (6, 5)
        >>> a.steps_to(p2)
        15
        >>> b.steps_to(p2)
        15
        """

        return sum(get_distance(b, a) for a, b in pairwise(self.movements_to(dest)))


def get_distance(point: Point, origin: Point = (0, 0)) -> int:
    """
    >>> get_distance((10, 10))
    20

    >>> get_distance((-5, -10))
    15

    >>> get_distance((10, 10), (5, 5))
    10

    >>> get_distance((-5, -5), (5, 5))
    20
    """

    return sum(len(range(*sorted(x))) for x in zip(point, origin))


def get_steps(a: Wire, b: Wire) -> Callable[[Point], int]:
    def fn(dest: Point) -> int:
        return a.steps_to(dest) + b.steps_to(dest)

    return fn


def perform(intersections: Set[Point], fn: Callable[[Point], int]) -> int:
    return min(map(fn, intersections))


def main() -> None:
    with get_input("day3") as lines:
        data = map(lambda x: x.split(","), lines)

    a, b = [Wire(x) for x in data]
    intersections = a.intersections(b)

    print("Part 1: {}".format(perform(intersections, get_distance)))
    print("Part 2: {}".format(perform(intersections, get_steps(a, b))))


if __name__ == "__main__":
    import doctest

    doctest.testmod()

    main()
