from functools import partial
from itertools import product
from typing import Iterable, List

from helpers import puzzle
from lib.opcodes import run


def data() -> Iterable[int]:
    return list(map(int, puzzle.input_data.split(",")))


def perform(data: List[int], noun: int, verb: int) -> int:
    data[1] = noun
    data[2] = verb

    return run(data)


def part_1(data: List[int]) -> int:
    return perform(data, 12, 2)


def part_2(data: List[int]) -> int:
    expected = 19690720

    for noun, verb in product(range(1, 100), range(1, 100)):
        val = perform(list(data), noun, verb)
        if val == expected:
            return 100 * noun + verb


# puzzle.answers = part_1(data), part_2(data)
print(part_1(data()))
print(part_2(data()))
