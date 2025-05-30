from dataclasses import dataclass
import sys
import time


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

    @staticmethod
    def from_list(l: list[float]):
        return EffectorLocation(l[0], l[1], l[2], l[3], l[4], l[5])

    def format(self) -> str:
        return f"{self.x:.3f}, {self.y:.3f}, {self.z:.3f}, {self.yaw:.3f}, {self.pitch:.3f}, {self.roll:.3f}"
    
    def __sub__(self, other):
        return EffectorLocation(
            self.x - other.x,
            self.y - other.y,
            self.z - other.z,
            self.yaw - other.yaw,
            self.pitch - other.pitch,
            self.roll - other.roll
        )


joint_attrs = ['j1', 'j2', 'j3', 'j4', 'j5', 'j6']
@dataclass
class JointLocation:
    j1: float
    j2: float
    j3: float
    j4: float
    j5: float
    j6: float

    def format(self) -> str:
        return f"{self.j1:.3f}, {self.j2:.3f}, {self.j3:.3f}, {self.j4:.3f}, {self.j5:.3f}, {self.j6:.3f}"

    def __sub__(self, other):
        return JointLocation(
            self.j1 - other.j1,
            self.j2 - other.j2,
            self.j3 - other.j3,
            self.j4 - other.j4,
            self.j5 - other.j5,
            self.j6 - other.j6,
        )

class Robot:
    def __init__(self, serial):
        self.serial = serial

    def _readline(self) -> str:
        l = self.serial.readline()
        print((b"> " + l.strip()).decode("ascii"), file=sys.stderr)
        return l

    def _read_unknown(self, timeout):
        end_time = time.monotonic() + timeout
        while time.monotonic() < end_time:
            while self.serial.in_waiting > 0:
                self.serial.read(self.serial.in_waiting)
                end_time = time.monotonic() + timeout

            time.sleep(0.05)

    def _read_dot(self):
        while True:
            l = self.serial.read(1)
            if l == b".":
                print("> .")
                return True
            elif l == b"*":
                print("got error, flailing.")
                self.flail()
                return False
            else:
                time.sleep(0.01)

    def _parse_floats(self, line) -> list[float]:
        return [float(x.decode("ascii")) for x in line.split()]

    def _write_command(self, command):
        self.serial.write(command.encode("ascii") + b"\r")

    def speed(self, speed):
        self._write_command(f"speed {speed:.2f}")
        self._readline()
        self._read_dot()

    def where(self) -> tuple[EffectorLocation, JointLocation]:
        self._write_command("where")
        self._readline()
        self._readline()
        effector_line = self._readline()
        self._readline()
        joint_line = self._readline()
        self._read_dot()

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
    
    def tool_offset(self) -> EffectorLocation:
        self._write_command("LISTL hand.tool")
        self._readline()
        self._readline()
        potential_dot = self.serial.read(1)
        if potential_dot == b'.':
            # No point defined
            return EffectorLocation(0, 0, 0, 0, 0, 0)
        name_and_values = self._readline()
        self._read_dot()

        # strip the variable name from the float list
        tool_line = b" ".join(name_and_values.strip().split(b" ")[1:])
        tool_split = self._parse_floats(tool_line)

        return EffectorLocation(
            tool_split[0],
            tool_split[1],
            tool_split[2],
            tool_split[3],
            tool_split[4],
            tool_split[5],
        )


    def jog_absolute(self, effector_location: EffectorLocation):
        effector_location_string = effector_location.format()
        self._write_command("do set jog0 = trans(" + effector_location_string + ")")
        self._readline()
        self._read_dot()
        self._write_command("do moves jog0")
        self._readline()
        self._read_dot()

    def jog_transform(self, effector_location: EffectorLocation):
        effector_location_string = effector_location.format()
        self._write_command(
            "do set jog0 = HERE:trans(" + effector_location_string + ")"
        )
        self._readline()
        self._read_dot()
        self._write_command("do move jog0")
        self._readline()
        self._read_dot()
    
    def jog_joint(self, joing_location: JointLocation):
        joint_location_string = joing_location.format()
        self._write_command("do set #jog1 = #PPOINT(" + joint_location_string + ")")
        self._readline()
        self._read_dot()
        self._write_command("do move #jog1")
        self._readline()
        self._read_dot()
    
    def tool_transform(self, tool_transform: EffectorLocation):
        tool_transform_string = tool_transform.format()
        self._write_command(
            "do set hand.tool = trans(" + tool_transform_string + ")"
        )
        self._readline()
        self._read_dot()
        self._write_command("TOOL hand.tool")
        self._readline()
        self._read_dot()
    
    def exec(self, command):
        self._write_command(command)
        self._read_unknown(2)

    def above(self):
        self._write_command("do above")
        self._readline()
        self._read_dot()

    def below(self):
        self._write_command("do below")
        self._readline()
        self._read_dot()

    def enable_power(self):
        self._write_command("en po")
        self._readline()
        self._readline()
        self._read_dot()

    def flail(self):
        self._readline()
        self._readline()
        self._readline()
        self._write_command("")
        self._readline()
