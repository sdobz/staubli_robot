import os
from http.server import HTTPServer
from functools import partial

from staubli.config import Config, env_exists
from .router import RoutingStaticHTTPRequestHandler

class RobotHTTPRequestHandler(RoutingStaticHTTPRequestHandler):
    def api_hello(self):
        return {"hello": "world"}

def run(server_class: HTTPServer, handler_class: RobotHTTPRequestHandler, config: Config=Config()):
    port = int(config.http_port)
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    env_file = ".env"
    config = Config.from_env(env_file) if env_exists(env_file) else Config()

    base_path = os.path.realpath(os.path.join(os.path.dirname(__file__), "..", "html"))
    handler_class = partial(RobotHTTPRequestHandler, base_path)

    run(server_class=HTTPServer, handler_class=handler_class, config=config)
