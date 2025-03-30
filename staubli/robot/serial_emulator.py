from textwrap import dedent
from .machine import JointLocation, EffectorLocation, joint_attrs
import time
import re
import math

class SerialEmulator:
    # Derived from a "where" after a "do ready"
    joint_location = JointLocation(-0.000, -90.001, 89.993, 0.000, -0.000, -0.005)
    effector_location = EffectorLocation(-0.077, 0.000, 985.000, 179.999, 0.008, 179.995)
    jog0_location = EffectorLocation(-0.077, 0.000, 985.000, 179.999, 0.008, 179.995)
    tool_location = EffectorLocation(0.000, 0.000, 0.000, 0.000, 0.000, 0.000)
    monitor_speed = 100
    buffer = ""
    baud = 9600

    @property
    def in_waiting(self):
        return len(self.buffer)

    def readline(self):
        print(">>> serial.readline()")
        buffer_lines = self.buffer.split("\n")
        response = buffer_lines[0]
        self.buffer = "\n".join(buffer_lines[1:])
        self.delay(response)
        return bytes(response, "ascii")
    def read(self, count):
        print(f">>> serial.read({count})")
        response = self.buffer[:count]
        self.buffer = self.buffer[count:]
        self.delay(response)
        return bytes(response, "ascii")

    def write(self, cmd_b: bytes):
        cmd = cmd_b.decode("ascii")
        self.delay(cmd)
        print(f"< {cmd}")

        if cmd.startswith("speed"):
            self.monitor_speed = float(cmd.split(" ")[1].strip())
            print(f">>> setting speed {self.monitor_speed}")
            self.buffer = "<emulator speed response>\n."
            return
        if cmd.startswith("do set jog0"):
            print(">>> setting jog0")
            self.handle_set_jog(cmd)
            self.buffer = "<emulator set jog0 response>\n."
            return
        if cmd.startswith("do move jog0"):
            print(">>> moving to jog0")
            self.handle_do_move()
            self.buffer = "<emulator move jog0 response>\n."
            return
        if cmd.startswith("do set hand.tool"):
            print(">>> setting hand.tool point")
            self.handle_set_tool(cmd)
            self.buffer = "<emulator set hand.tool response>\n."
            return
        if cmd.startswith("TOOL hand.tool"):
            print(">>> setting tool hand.tool")
            self.buffer = "<emulator TOOL hand.tool response>\n."
            return
        if cmd.startswith("do drive "):
            self.handle_do_drive(cmd)
            self.buffer = "<emulator do drive response>\n."
            return
        if cmd.startswith("where"):
            print(">>> concocting where")
            self.buffer = dedent(f"""\
                
                X         Y         Z         y         p         r       Hand
                {self.effector_location.x:3f}   {self.effector_location.y:3f}   {self.effector_location.z:3f}   {self.effector_location.yaw:3f}   {self.effector_location.pitch:3f}   {self.effector_location.roll:3f}   0.000
                J1        J2        J3        J4        J5        J6
                {self.joint_location.j1:3f}   {self.joint_location.j2:3f}   {self.joint_location.j3:3f}   {self.joint_location.j4:3f}   {self.joint_location.j5:3f}   {self.joint_location.j6:3f}
                .""")
            return
        if cmd.startswith("LISTL hand.tool"):
            print(">>> concocting LISTL")
            self.buffer = dedent(f"""\
                X.jt1 y/jt2 z/jt3 y/jt4 p/jt5 r/jt6
                {self.tool_location.x:3f}   {self.tool_location.y:3f}   {self.tool_location.z:3f}   {self.tool_location.yaw:3f}   {self.tool_location.pitch:3f}   {self.tool_location.roll:3f}
                .""")
            return
        if cmd.startswith("do above"):
            print(">>> elbow above")
            self.buffer = "<above>\n."
            return
        if cmd.startswith("do below"):
            print(">>> elbow below")
            self.buffer = "<below>\n."
            return
        if cmd.startswith("en po"):
            print(">>> enabling high power")
            self.buffer = dedent("""\
                <high power line 1>
                <high power line 2>
                .""")
            return
        
        print(">>> unknown command")
        self.buffer = dedent("""\
            <unknown command line 1>
            <unknown command line 2>
        .""")
    
    def handle_set_jog(self, cmd):
        pattern = r"trans\(([^)]+)\)"
        match = re.search(pattern, cmd)
        if match:
            values = list(map(float, match.group(1).split(',')))
            self.jog0_location = EffectorLocation(*values)
    
    def handle_set_tool(self, cmd):
        pattern = r"trans\(([^)]+)\)"
        match = re.search(pattern, cmd)
        if match:
            values = list(map(float, match.group(1).split(',')))
            self.tool_location = EffectorLocation(*values)
    
    def handle_do_move(self):
        delta = self.effector_location - self.jog0_location

        angle_distance = max(abs(delta.yaw), abs(delta.pitch), abs(delta.roll))
        linear_distance = math.sqrt((delta.x**2) + (delta.y**2) + (delta.z**2))

        max_distance = max(angle_distance, linear_distance)
        ms_delay = max_distance / self.monitor_speed
        print(f">>> moving {linear_distance}mm and {angle_distance}deg ({ms_delay}ms)")
        time.sleep(ms_delay / 1000)
        self.effector_location = self.jog0_location

    def handle_do_drive(self, cmd):
        drive, delta, command_speed = "".join(cmd.split(" ")[2:]).split(",")

        speed = (float(command_speed)/100) * (self.monitor_speed/100) * 100

        ms_delay = abs(float(delta)) / float(speed)
        print(f">>> starting drive {drive} move {delta} at {speed} ({ms_delay}ms)")
        time.sleep(ms_delay / 1000)

        joint_attr = joint_attrs[int(drive) - 1]
        current_joint_angle = getattr(self.joint_location, joint_attr)
        next_joint_angle = current_joint_angle + float(delta)
        setattr(self.joint_location, joint_attr, next_joint_angle)
        print(f">>> set joint {joint_attr} from {current_joint_angle} to {next_joint_angle}")


    def close(self):
        pass

    def delay(self, string: str):
        bits = len(string) * 8
        delay = bits / self.baud
        time.sleep(delay)
