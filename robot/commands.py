from dataclasses import dataclass
import sys


@dataclass
class EffectorLocation:
    x: float
    y: float
    z: float
    roll: float
    pitch: float
    yaw: float

    def format(self) -> str:
        return f"{self.x:3f}, {self.y:3f}, {self.z:3f}"


@dataclass
class JointLocation:
    j1: float
    j2: float
    j3: float
    j4: float
    j5: float
    j6: float


class Robot:
    def __init__(self, serial):
        self.serial = serial

    def _readline(self) -> str:
        l = self.serial.readline()
        # print((b"> " + l).decode("ascii"), file=sys.stderr)
        return l

    def _parse_floats(self, line) -> list[float]:
        return [float(x.decode("ascii")) for x in line.split()]

    def _write_command(self, command):
        self.serial.write(command.encode("ascii") + b"\r")

    def speed(self, speed):
        self._write_command(f"speed {speed:2f}")
        self._readline()
        self.serial.read()

    def where(self) -> tuple[EffectorLocation, JointLocation]:
        self._write_command("where")
        self._readline()
        self._readline()
        effector_line = self._readline()
        self._readline()
        joint_line = self._readline()
        self.serial.read()

        effector_split = self._parse_floats(effector_line)
        joint_split = self._parse_floats(joint_line)
        print(effector_split)
        print(joint_split)
        effector_location = EffectorLocation(
            effector_split[0],
            effector_split[1],
            effector_split[2],
            effector_split[3],
            effector_split[4],
            effector_split[5],
        )

        return (
            effector_location,
            JointLocation(
                joint_split[0],
                joint_split[1],
                joint_split[2],
                joint_split[3],
                joint_split[4],
                joint_split[5],
            ),
        )

    def jogTransform(self, effector_location: EffectorLocation):
        self._write_command("do set jog0 = here")
        self._readline()
        self.serial.read()
        effector_location_string = effector_location.format()
        self._write_command(
            "do set jog0 = shift(jog0 by " + effector_location_string + ")"
        )
        self._readline()
        self.serial.read()
        self._write_command("do move jog0")
        self._readline()
        self.serial.read()
