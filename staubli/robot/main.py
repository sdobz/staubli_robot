import serial
import sys
from .machine import EffectorLocation, Robot
from .controller import handle_input
from staubli.config import Config, env_exists
from .data import write, read


class Main:
    config: Config
    ser: serial.Serial = None
    robot: Robot = None

    def __init__(self, config=Config()):
        self.config = config

    def initialize(self):
        self.ser = serial.Serial(
            self.config.serial_device,
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


angles = [5, 10, 15, 30, 45]


class ControllerDelegate:
    positions: list[EffectorLocation] = None

    def __init__(self, robot, ser):
        self.robot = robot
        self.ser = ser
        self.distance = 100
        self.angle_index = 4
        self.elbow = "above"
        self.positions = read()
        print(self.positions)
        self.positions_index = 0

    def angle_step(self):
        return angles[self.angle_index]

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
        self.robot.jog_transform(EffectorLocation(0, 0, 0, -self.angle_step(), 0, 0))

    def on_yaw_right(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, self.angle_step(), 0, 0))

    def on_pitch_up(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, self.angle_step(), 0))

    def on_pitch_down(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, -self.angle_step(), 0))

    def on_roll_left(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, 0, -self.angle_step()))

    def on_roll_right(self):
        self.robot.jog_transform(EffectorLocation(0, 0, 0, 0, 0, self.angle_step()))

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

    def on_angle_minus(self):
        self.angle_index -= 1
        if self.angle_index <= 0:
            self.angle_index = 0
        print("angle_step = " + str(angles[self.angle_index]))

    def on_angle_plus(self):
        self.angle_index += 1
        if self.angle_index >= len(angles) - 1:
            self.angle_index = len(angles) - 1
        print("angle_step = " + str(angles[self.angle_index]))

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
        self.positions.append(("position " + str(len(self.positions) + 1), position))
        write(self.positions)
        print("positions: " + str(self.positions))

    def _jog_to_position(self):
        p: tuple[str, EffectorLocation] = self.positions[self.positions_index]
        print("jogging to position " + str(self.positions_index) + ": '" + p[0] + "'")
        self.robot.jog_absolute(p[1])

    def on_next_position(self):
        self.positions_index = self.positions_index + 1
        if self.positions_index == len(self.positions):
            self.positions_index = 0

        self._jog_to_position()

    def on_previous_position(self):
        self.positions_index = self.positions_index - 1
        if self.positions_index == -1:
            self.positions_index = len(self.positions) - 1

        self._jog_to_position()

    def on_reset(self):
        print("resetting robot, expect 'press HIGH POWER button' message")
        self.robot.enable_power()

    def on_quit(self):
        self.ser.close()
        sys.exit()


def main(config: Config):
    main = Main(config=config)
    main.initialize()
    main.loop()


if __name__ == "__main__":
    env_file = ".env"
    config = Config.from_env(env_file) if env_exists(env_file) else Config()
    main(config)
