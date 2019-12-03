from abc import ABC
from dataclasses import dataclass, field
from pathlib import Path
from textwrap import dedent
from typing import Any, Callable, Generic, Iterable, Optional, Type, TypeVar
from typing import cast as _cast

T = TypeVar("T")

Line = Iterable[T]
Lines = Iterable[Line[T]]

PartRenderer = Callable[[str], T]


@dataclass()
class Day(ABC, Generic[T]):
    cast: Type[T] = _cast(Type[T], int)
    content: str = ""

    def __post_init__(self) -> None:
        if not self.content:
            self.content = open(self.__class__.input_file(), "r").read()

    def part_1(self, lines: Lines[T]) -> Any:
        pass

    def part_2(self, lines: Lines[T]) -> Any:
        pass

    @classmethod
    def input_file(cls) -> Path:
        name = cls.__name__.lower()
        return Path(__file__).parent / f"{name}.input.txt"

    @property
    def data(self) -> Lines[T]:
        lines = map(lambda x: x.split(","), dedent(self.content).strip().splitlines())

        return (map(self.__class__.cast, line) for line in lines)


def run(day: Type[Day[T]]) -> None:
    d = day()
    print(f"Part 1: {d.part_1(d.data)}")
    print(f"Part 2: {d.part_2(d.data)}")
