import json
from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Example: Returning a simple message for GET requests
        response = {"message": "Hello, World!"}
        self._send_response(200, response)

    def do_POST(self):
        # Read and parse JSON data from POST request
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        # Process the data and send a response
        response = {"received": data}
        self._send_response(201, response)

    def _send_response(self, status_code, response):
        # Send response headers
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Send response body
        self.wfile.write(json.dumps(response).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
