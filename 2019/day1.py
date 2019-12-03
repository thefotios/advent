from itertools import chain
from typing import Iterable

from base import Day, Lines, run


def calculate_fuel(mass: int) -> int:
    return max((mass // 3) - 2, 0)


def recurse_fuel(mass: int) -> int:
    def get_masses(mass: int) -> Iterable[int]:
        fuel = calculate_fuel(mass)
        if fuel > 0:
            yield from chain([fuel], get_masses(fuel))

    return sum(get_masses((mass)))


class Day1(Day[int]):
    def part_1(self, lines: Lines[int]) -> int:
        return sum(map(calculate_fuel, chain(*lines)))

    def part_2(self, lines: Lines[int]) -> int:
        return sum(map(recurse_fuel, chain(*lines)))


run(Day1)
