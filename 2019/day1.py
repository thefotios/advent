from itertools import chain
from typing import Callable, Iterable

from helpers import get_input


def calculate_fuel(mass: int) -> int:
    return max((mass // 3) - 2, 0)


def recurse_fuel(mass: int) -> int:
    def get_masses(mass: int) -> Iterable[int]:
        fuel = calculate_fuel(mass)
        if fuel > 0:
            yield from chain([fuel], get_masses(fuel))

    return sum(get_masses((mass)))


def perform(data: Iterable[int], fn: Callable[[int], int]) -> int:
    return sum(map(fn, data))


def main() -> None:
    with get_input("day1") as lines:
        data = list(map(int, lines))

    print("Part 1: {}".format(perform(data, calculate_fuel)))
    print("Part 2: {}".format(perform(data, recurse_fuel)))


if __name__ == "__main__":
    main()
