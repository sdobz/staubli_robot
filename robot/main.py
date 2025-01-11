import serial
import time
from commands import EffectorLocation, Robot


def main():
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


if __name__ == "__main__":
    main()
