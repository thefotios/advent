from collections import Counter
from itertools import tee
from typing import Callable, Iterable

from helpers import pairwise


def is_valid(allow_larger: bool = True) -> Callable[[str], bool]:
    def fn(cur: str) -> bool:
        p1, p2 = tee(pairwise(map(int, cur)), 2)
        matching = Counter(filter(lambda x: x[0] == x[1], p1))

        if allow_larger:
            has_matching = any(matching)
        else:
            has_matching = 1 in matching.values()

        increasing = all(b >= a for a, b in p2)

        return has_matching and increasing

    return fn


def perform(data: Iterable[int], allow_larger: bool = True) -> int:
    return len(list(filter(is_valid(allow_larger), map(str, data))))


def main() -> None:
    lower = 197487
    upper = 673251
    bounds = range(lower, upper)

    print("Part 1: {}".format(perform(bounds)))
    print("Part 2: {}".format(perform(bounds, False)))


if __name__ == "__main__":
    main()
