const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your existing site files
app.use(express.static(path.join(__dirname)));

// Route for chat page (or integrate into your index.html)
app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "chat.html"));
});

// Socket.IO for chat
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Use Render’s PORT environment variable or fallback to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
