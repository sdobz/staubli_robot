from dataclasses import dataclass
import sys


@dataclass
class EffectorLocation:
    x: float
    y: float
    z: float
    yaw: float
    pitch: float
    roll: float

    def to_list(self) -> list[float]:
        return [self.x, self.y, self.z, self.yaw, self.pitch, self.roll]

    def format(self) -> str:
        return f"{self.x:3f}, {self.y:3f}, {self.z:3f}, {self.yaw:3f}, {self.pitch:3f}, {self.roll:3f}"


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
        print((b"> " + l.strip()).decode("ascii"), file=sys.stderr)
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

    def jog_absolute(self, effector_location: EffectorLocation):
        effector_location_string = effector_location.format()
        self._write_command("do set jog0 = trans(" + effector_location_string + ")")
        self._readline()
        self.serial.read()
        self._write_command("do move jog0")
        self._readline()
        self.serial.read()

    def jog_transform(self, effector_location: EffectorLocation):
        effector_location_string = effector_location.format()
        self._write_command(
            "do set jog0 = HERE:trans(" + effector_location_string + ")"
        )
        self._readline()
        self.serial.read()
        self._write_command("do move jog0")
        self._readline()
        self.serial.read()

    def above(self):
        self._write_command("do above")
        self._readline()
        self.serial.read()

    def below(self):
        self._write_command("do below")
        self._readline()
        self.serial.read()

    def enable_power(self):
        self._write_command("en po")
        self._readline()
        self._readline()
        self.serial.read()

    def flail(self):
        self._readline()
        self._readline()
        self._readline()
        self._write_command("")
        self._readline()
