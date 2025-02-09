import json
from http.server import SimpleHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

class RoutingStaticHTTPRequestHandler(SimpleHTTPRequestHandler):
    base_path: str

    extensions_map = {
        '.manifest': 'text/cache-manifest',
	    '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg':	'image/svg+xml',
        '.css':	'text/css',
        '.js':	'application/x-javascript',
        '': 'application/octet-stream', # Default
    }

    def do_GET(self):
        parsed_path = urlparse(self.path)

        attr = parsed_path.path[1:].replace("/", "_")
        if hasattr(self, attr):
            response = getattr(self, attr)(**parse_qs(parsed_path.params))
            self._send_response(200, response)
            return
        
        super().do_GET()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        response = {"received": data}
        self._send_response(200, response)

    def _send_404(self):
        self._send_response(404, {})

    def _send_response(self, status_code, response):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        self.wfile.write(json.dumps(response).encode('utf-8'))
