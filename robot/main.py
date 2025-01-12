import serial
import sys
from commands import EffectorLocation, Robot
from controller import handle_input
import data


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
            timeout=1,
            bytesize=8,
            parity=serial.PARITY_NONE,
            stopbits=1,
        )
        self.robot = Robot(self.ser)
        self.robot.speed(20)

    def loop(self):
        d = ControllerDelegate(self.robot, self.ser)
        handle_input(d)


class ControllerDelegate:
    positions: list[EffectorLocation] = None

    def __init__(self, robot, ser):
        self.robot = robot
        self.ser = ser
        self.distance = 100
        self.rotation = 15
        self.elbow = "above"
        self.positions = data.read()
        print(self.positions)
        self.positions_index = -1

    def on_up(self):
        self.robot.jog_transform(EffectorLocation(0, 0, self.distance, 0, 0, 0))

    def on_down(self):
        self.robot.jog_transform(EffectorLocation(0, 0, -self.distance, 0, 0, 0))

    def on_left(self):
        self.robot.jog_transform(EffectorLocation(-self.distance, 0, 0, 0, 0, 0))

    def on_right(self):
        self.robot.jog_transform(EffectorLocation(self.distance, 0, 0, 0, 0, 0))

    def on_forward(self):
        self.robot.jog_transform(EffectorLocation(0, self.distance, 0, 0, 0, 0))

    def on_back(self):
        self.robot.jog_transform(EffectorLocation(0, -self.distance, 0, 0, 0, 0))

    def on_yaw_left(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, -self.rotation, 0, 0))

    def on_yaw_right(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, self.rotation, 0, 0))

    def on_pitch_up(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, self.rotation, 0))

    def on_pitch_down(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, -self.rotation, 0))

    def on_roll_left(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, 0, -self.rotation))

    def on_roll_right(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, 0, self.rotation))

    def on_minus(self):
        self.distance -= 10
        print("distance = " + str(self.distance))
        if self.distance <= 10:
            self.distance = 10

    def on_plus(self):
        self.distance += 10
        print("distance = " + str(self.distance))
        if self.distance >= 1000:
            self.distance = 1000

    def on_elbow(self):
        if self.elbow == "above":
            self.robot.below()
            self.elbow = "below"
        else:
            self.robot.above()
            self.elbow = "above"

    def on_flail(self):
        print("flailing!")
        self.robot.flail()

    def on_print_position(self):
        position = self.robot.where()[0]
        self.positions.append(position)
        data.write(self.positions)
        print("positions: " + str(self.positions))

    def on_next_position(self):
        self.positions_index = self.positions_index + 1
        if self.positions_index == len(self.positions):
            self.positions_index = -1
            print("wrapped on positions!")
        else:
            self.robot.jog_absolute(self.positions[self.positions_index])

    def on_reset(self):
        print("resetting robot, expect 'press HIGH POWER button' message")
        self.robot.enable_power()

    def on_quit(self):
        self.ser.close()
        sys.exit()


def main():
    main = Main()
    main.initialize()
    main.loop()


if __name__ == "__main__":
    main()
