from textwrap import dedent
class SerialEmulator:
    buffer = ""
    def readline(self):
        print(">>> serial.readline()")
        buffer_lines = self.buffer.split("\n")
        response = buffer_lines[0]
        self.buffer = "\n".join(buffer_lines[1:])
        return bytes(response, "ascii")
    def read(self, count):
        print(f">>> serial.read({count})")
        response = self.buffer[:count]
        self.buffer = self.buffer[count:]
        return bytes(response, "ascii")

    def write(self, cmd_b: bytes):
        cmd = cmd_b.decode("ascii")
        print(f"< {cmd}")

        if cmd.startswith("speed"):
            print(">>> setting speed")
            self.buffer = "<emulator speed response>\n."
            return
        if cmd.startswith("do set jog0"):
            print(">>> setting jog0")
            self.buffer = "<emulator set jog0 response>\n."
            return
        if cmd.startswith("do move jog0"):
            print(">>> moving to jog0")
            self.buffer = "<emulator move jog0 response>\n."
            return
        if cmd.startswith("where"):
            print(">>> concocting where")
            self.buffer = dedent("""\
                X         Y         Z         y         p         r       Hand
                -0.077     0.000   985.000   179.999     0.008   179.995     0.000
                J1        J2        J3        J4        J5        J6
                -0.000   -90.001    89.993     0.000    -0.000    -0.005
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

    def close(self):
        pass
