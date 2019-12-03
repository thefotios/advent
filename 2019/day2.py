from functools import partial
from itertools import product
from operator import add, mul
from typing import Iterable

from base import Day, Lines, run

opcodes = {1: add, 2: mul}


def run_opcodes(data: Iterable[int], noun: int, verb: int) -> int:
    data = list(data)
    data[1] = noun
    data[2] = verb

    for i in range(0, len(data), 4):
        opcode, input1, input2, output, *_ = [*data[i : i + 4], None, None, None]

        if opcode == 99:
            break
        elif opcode in opcodes:
            fn = opcodes.get(opcode)
        else:
            raise Exception("Something went wrong")

        data[output] = fn(data[input1], data[input2])

    return data[0]


class Day2(Day[int]):
    expected = 19690720

    def part_1(self, lines: Lines[int]) -> int:
        return run_opcodes(list(lines)[0], 12, 2)

    def part_2(self, lines: Lines[int]) -> int:
        fn = partial(run_opcodes, list(list(lines)[0]))
        for noun, verb in product(range(1, 100), range(1, 100)):
            val = fn(noun, verb)
            if val == self.expected:
                return 100 * noun + verb


run(Day2)
