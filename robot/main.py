import serial
import time
from commands import EffectorLocation, Robot
from controller import handle_input


def _main():
    serial_device = "/dev/tty.usbserial-10"
    ser = serial.Serial(
        serial_device,
        9600,
        timeout=5,
        bytesize=8,
        parity=serial.PARITY_NONE,
        stopbits=1,
    )
    robot = Robot(ser)

    print(robot.where())
    robot.speed(30)

    print("jog z down!")
    robot.jogTransform(EffectorLocation(0, 0, -50, 0, 0, 0))
    print("jog z up!")
    robot.jogTransform(EffectorLocation(0, 0, 50, 0, 0, 0))

    ser.close()


class ControllerDelegate:
    def onUp(self):
        print("up")

    def onDown(self):
        print("down")

    def onLeft(self):
        print("left")

    def onRight(self):
        print("right")


def main():
    d = ControllerDelegate()
    handle_input(d)


if __name__ == "__main__":
    main()
