const socket = new WebSocket("ws://localhost:8765");

socket.onmessage = (event) => {
  console.log(event);
};
