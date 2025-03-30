import json
import websockets.sync.server

# Store connected WebSocket clients
clients = set()

def broadcast_to_websockets(payload):
    """Sends a message to all connected WebSocket clients."""
    disconnected_clients = set()
    for client in clients:
        try:
            msg = json.dumps(payload)
            client.send(msg)
        except Exception as e:
            print(e)
            print("disconnected!")
            disconnected_clients.add(client)  # Remove disconnected clients

    for client in disconnected_clients:
        clients.remove(client)


def websocket_handler(ws):
    """Handles incoming WebSocket connections."""
    print("New WebSocket connection")
    clients.add(ws)
    try:
        for message in ws:
            print(f"WebSocket received: {message}")
    finally:
        clients.remove(ws)
        print("WebSocket client disconnected")

def start_websocket_server():
    server = websockets.sync.server.serve(websocket_handler, "", 8765)
    server.serve_forever() 

class WebsocketWrapper:
    def __init__(self, wrapped):
        self.wrapped = wrapped

    @property
    def in_waiting(self):
        return self.wrapped.in_waiting

    def readline(self):
        response = self.wrapped.readline()
        self.broadcast("readline", response)
        return response
    def read(self, count):
        response = self.wrapped.read(count)
        self.broadcast("read", response)
        return response
    def write(self, cmd_b: bytes):
        self.broadcast("write", cmd_b)
        return self.wrapped.write(cmd_b)

    def broadcast(self, mode, bytes: bytes):
        broadcast_to_websockets({
            "mode": mode,
            "msg": bytes.decode("ascii")
        })