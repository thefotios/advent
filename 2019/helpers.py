from contextlib import contextmanager
from itertools import tee
from typing import Generator, Iterable, Tuple, TypeVar

from aocd.get import get_day_and_year
from aocd.models import Puzzle

from lib.opcodes import run as run_opcodes

T = TypeVar("T")


day, year = get_day_and_year()
puzzle = Puzzle(day=day, year=year)


def pairwise(iterable: Iterable[T]) -> Iterable[Tuple[T, T]]:
    "s -> (s0,s1), (s1,s2), (s2, s3), ..."
    a, b = tee(iterable)
    next(b, None)
    return zip(a, b)


@contextmanager
def get_input(day: str) -> Generator[Iterable[str], None, None]:
    with open(f"{day}.input.txt", "r") as f:
        yield map(str.strip, f.readlines())
