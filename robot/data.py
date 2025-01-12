import json
import os

from machine import EffectorLocation


def write(items: list[(str, EffectorLocation)]):
    with open("points.json", "w") as f:
        json.dump(
            [{"name": x[0], "location": x[1].to_list()} for x in items], f, indent=4
        )


def read() -> list[(str, EffectorLocation)]:
    if not os.path.exists("points.json"):
        return []

    try:
        with open("points.json", "r") as f:
            return [
                (x["name"], EffectorLocation.from_list(x["location"]))
                for x in json.load(f)
            ]
    except json.JSONDecodeError as e:
        print("error loading points, returning empty array")
        return []
