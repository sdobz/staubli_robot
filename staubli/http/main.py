import os
from http.server import HTTPServer
from functools import partial
import threading
import socketserver

from staubli.config import Config, env_exists
from staubli.http.websockets import start_websocket_server
from staubli.robot.main import Main, ControllerDelegate
from staubli.robot.machine import EffectorLocation, JointLocation
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
    def _tool_offset(self):
        tool_offset = self.controller.robot.tool_offset()
        return self._format_effector_location(tool_offset)
    
    def api_robot(self):
        return {
            "position": self._position(),
            "tool_offset": self._tool_offset(),
            "elbow": self.controller.elbow,
            "speed": 20
        }
    def api_position(self):
        return {
            "position": self._position()
        }
    def api_tool_offset(self):
        return {
            "tool_offset": self._tool_offset()
        }
    
    def api_effector(self, data):
        effector_location = EffectorLocation(
            data["x"],
            data["y"],
            data["z"],
            data["yaw"],
            data["pitch"],
            data["roll"]
        )
        self.controller.robot.jog_absolute(effector_location)
        return self.api_position()
    
    def api_joints(self, data):
        joint_location = JointLocation(
            data["j1"],
            data["j2"],
            data["j3"],
            data["j4"],
            data["j5"],
            data["j6"]
        )
        self.controller.robot.jog_joint(joint_location)
        return self.api_position()
    
    def api_tool(self, data):
        tool_location = EffectorLocation(
            data["x"],
            data["y"],
            data["z"],
            data["yaw"],
            data["pitch"],
            data["roll"]
        )
        self.controller.robot.tool_transform(tool_location)
        return self.api_tool_offset()

    def api_elbow(self):
        self.controller.on_elbow()
        return { "elbow": self.controller.elbow }

    def api_flail(self):
        self.controller.on_flail()

    def api_reset(self):
        self.controller.on_reset()

class ThreadingHTTPServer(socketserver.ThreadingMixIn, HTTPServer):
    """Threaded HTTP Server."""

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

def main():
    env_file = ".env"
    config = Config.from_env(env_file) if env_exists(env_file) else Config()

    threading.Thread(target=start_websocket_server, daemon=True).start()
    run(server_class=ThreadingHTTPServer, handler_class=RobotHTTPRequestHandler, config=config)

if __name__ == '__main__':
    main()
