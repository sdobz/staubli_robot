import os
from http.server import HTTPServer
from functools import partial

from staubli.config import Config, env_exists
from staubli.robot.main import Main, ControllerDelegate
from staubli.robot.machine import EffectorLocation
from .router import RoutingStaticHTTPRequestHandler

class RobotHTTPRequestHandler(RoutingStaticHTTPRequestHandler):
    controller: ControllerDelegate

    def __init__(self, controller, *args, **kwargs):
        self.controller = controller
        # https://stackoverflow.com/a/52046062
        # BaseHTTPRequestHandler calls do_GET **inside** __init__ !!!
        # So we have to call super().__init__ after setting attributes
        super().__init__(*args, **kwargs)

    def api_hello(self):
        return {"hello": "world"}

    def _format_positions(self, positions: list[tuple[str, EffectorLocation]]):
        print(positions)
        return [{"name": loc[0], "position": self._format_effector_location(loc[1])} for loc in positions]

    def _format_effector_location(self, effector_location: EffectorLocation):
        return {
            "x": effector_location.x,
            "y": effector_location.y,
            "z": effector_location.z,
            "roll": effector_location.roll,
            "pitch": effector_location.pitch,
            "yaw": effector_location.yaw
        }
    def _position(self):
        where = self.controller.robot.where()
        return {
            "effector": self._format_effector_location(where[0]),
            "joints": {
                "j1": where[1].j1,
                "j2": where[1].j2,
                "j3": where[1].j3,
                "j4": where[1].j4,
                "j5": where[1].j5,
                "j6": where[1].j6
            }
        }

    
    def api_robot(self):
        return {
            "position": self._position(),
            "distance": self.controller.distance,
            "angle_step": self.controller.angle_step(),
            "elbow": self.controller.elbow,
            "positions": self._format_positions(self.controller.positions),
            "positions_index": self.controller.positions_index
        }
    def api_position(self):
        return {
            "position": self._position()
        }

    def api_up(self):
        self.controller.on_up()

    def api_down(self):
        self.controller.on_down()

    def api_left(self):
        self.controller.on_left()

    def api_right(self):
        self.controller.on_right()

    def api_forward(self):
        self.controller.on_forward()

    def api_back(self):
        self.controller.on_back()

    def api_yaw_left(self):
        self.controller.on_yaw_left()

    def api_yaw_right(self):
        self.controller.on_yaw_right()

    def api_pitch_up(self):
        self.controller.on_pitch_up()

    def api_pitch_down(self):
        self.controller.on_pitch_down()

    def api_roll_left(self):
        self.controller.on_roll_left()

    def api_roll_right(self):
        self.controller.on_roll_right()

    def api_minus(self):
        self.controller.on_minus()
        return { "distance": self.controller.distance}

    def api_plus(self):
        self.controller.on_plus()
        return { "distance": self.controller.distance}

    def api_angle_minus(self):
        self.controller.on_angle_minus()
        return { "angle_step": self.controller.angle_step() }

    def api_angle_plus(self):
        self.controller.on_angle_plus()
        return { "angle_step": self.controller.angle_step() }

    def api_elbow(self):
        self.controller.on_elbow()
        return { "elbow": self.controller.elbow }

    def api_flail(self):
        self.controller.on_flail()

    def api_print_position(self):
        self.controller.on_print_position()
        return { "positions": self._format_positions(self.controller.positions) }

    def api_next_position(self):
        self.controller.on_next_position()
        return { "position_index": self.controller.positions_index }

    def api_previous_position(self):
        self.controller.on_previous_position()
        return { "position_index": self.controller.positions_index }

    def api_reset(self):
        self.controller.on_reset()

def run(server_class: HTTPServer, handler_class: RobotHTTPRequestHandler, config: Config=Config()):
    port = int(config.http_port)
    server_address = ('', port)

    robot_main = Main(config)
    robot_main.initialize()
    controller = robot_main.controller()

    base_path = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "html"))
    parameterized_handler = partial(handler_class, controller, directory=base_path)

    httpd = server_class(server_address, parameterized_handler)
    print(f'Starting server on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    env_file = ".env"
    config = Config.from_env(env_file) if env_exists(env_file) else Config()


    run(server_class=HTTPServer, handler_class=RobotHTTPRequestHandler, config=config)
