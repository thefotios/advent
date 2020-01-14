from typing import Iterable

from helpers import puzzle
from lib.opcodes import run


def data() -> Iterable[int]:
    return list(map(int, puzzle.input_data.split(",")))


def perform(data: Iterable[int]):
    """
    >>> perform([3,0,4,0,99])
    1
    >>> perform([1, 0, 3, 3, 1005, 2, 10, 5, 1, 0, 4, 1, 99])
    0
    """
    run(data)


def main():
    perform(data())


if __name__ == "__main__":
    import doctest

    doctest.testmod()

    main()
