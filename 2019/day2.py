from functools import partial
from itertools import product
from operator import add, mul
from typing import Iterable

from helpers import get_input

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


def part_1(data: Iterable[int]) -> int:
    return run_opcodes(data, 12, 2)


def part_2(data: Iterable[int]) -> int:
    expected = 19690720

    fn = partial(run_opcodes, data)
    for noun, verb in product(range(1, 100), range(1, 100)):
        val = fn(noun, verb)
        if val == expected:
            return 100 * noun + verb


def main() -> None:
    with get_input("day2") as lines:
        data = list(map(int, list(lines)[0].split(",")))

    print("Part 1: {}".format(part_1(data)))
    print("Part 2: {}".format(part_2(data)))


if __name__ == "__main__":
    main()
