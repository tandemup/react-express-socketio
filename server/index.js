import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  socket.on("message", (body) => {
    console.log(body);
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(6),
    });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`💬 server on port ${PORT}`));

//server.listen(4000);
//console.log("Server listening on port", 4000);
