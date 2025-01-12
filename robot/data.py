import json
import os

from commands import EffectorLocation


def write(items: list[EffectorLocation]):
    with open("points.json", "w") as f:
        json.dump([x.to_list() for x in items], f, indent=4)


def read() -> list[EffectorLocation]:
    if not os.path.exists("points.json"):
        return []

    try:
        with open("points.json", "r") as f:
            return [EffectorLocation.from_list(x) for x in json.load(f)]
    except json.JSONDecodeError as e:
        print("error loading points, returning empty array")
        return []
