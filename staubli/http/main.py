import os
from http.server import HTTPServer
from functools import partial

from staubli.config import Config, env_exists
from staubli.robot.main import Main, ControllerDelegate
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
    
    def api_robot(self):
        return {
            "distance": self.controller.distance
        }

def run(server_class: HTTPServer, handler_class: RobotHTTPRequestHandler, config: Config=Config()):
    port = int(config.http_port)
    server_address = ('', port)

    controller = Main(config).controller()

    base_path = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "html"))
    parameterized_handler = partial(handler_class, controller, directory=base_path)

    httpd = server_class(server_address, parameterized_handler)
    print(f'Starting server on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    env_file = ".env"
    config = Config.from_env(env_file) if env_exists(env_file) else Config()


    run(server_class=HTTPServer, handler_class=RobotHTTPRequestHandler, config=config)
