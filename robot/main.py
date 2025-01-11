import serial
import sys
from commands import EffectorLocation, Robot
from controller import handle_input

class Main:
    serial_device: str = "/dev/tty.usbserial-10"
    ser: serial.Serial = None
    robot: Robot = None

    def __init__(self):
        pass

    def initialize(self):
        self.ser = serial.Serial(
            self.serial_device,
            9600,
            timeout=5,
            bytesize=8,
            parity=serial.PARITY_NONE,
            stopbits=1,
        )
        self.robot = Robot(self.ser)
        self.robot.speed(100)

    def loop(self):
        d = ControllerDelegate(self.robot, self.ser)
        handle_input(d)



class ControllerDelegate:
    def __init__(self, robot, ser):
        self.robot = robot
        self.ser = ser

    def onUp(self):
        self.robot.jogTransform(EffectorLocation(0, 0, 10, 0, 0, 0))

    def onDown(self):
        self.robot.jogTransform(EffectorLocation(0, 0, -10, 0, 0, 0))

    def onLeft(self):
        self.robot.jogTransform(EffectorLocation(-10, 0, 0, 0, 0, 0))

    def onRight(self):
        self.robot.jogTransform(EffectorLocation(10, 0, 0, 0, 0, 0))

    def onQuit(self):
        self.ser.close()
        sys.exit()


def main():
    main = Main()
    main.initialize()
    main.loop()


if __name__ == "__main__":
    main()
