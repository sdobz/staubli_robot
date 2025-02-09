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
        if cmd.startswith("do move jog0"):
            print(">>> moving to jog0")
            self.buffer = "<emulator move jog0 response>\n."
    def close(self):
        pass
