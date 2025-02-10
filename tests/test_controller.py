import unittest
from robot.controller import handle_chunk


class TestDelegate:
    commands: list[str]

    def __init__(self):
        self.commands = []

    def on_up(self):
        self.commands.append("up")

    def on_down(self):
        self.commands.append("down")

    def on_left(self):
        self.commands.append("left")

    def on_right(self):
        self.commands.append("right")


class TestController(unittest.TestCase):
    def test_handles_input(self):
        delegate = TestDelegate()
        handle_chunk(b"wasd", delegate)

        self.assertEqual(delegate.commands, ["up", "left", "down", "right"])
