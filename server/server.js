const express = require("express");
const connectDatabase = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");
// const allChats = require("./data/data");
// const colors = require("colors");

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, console.log(`Listening on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (userInfo) => {
    socket.join(userInfo._id);
    socket.emit("connected");
  });

  socket.on("joinChat", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => {
    socket.broadcast.to(room).emit("typing");
  });

  socket.on("newMessage", (newMessageReceived) => {
    // console.log("newMessageReceived", newMessageReceived);
    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");

    socket.broadcast.to(chat._id).emit("messageReceived", newMessageReceived);
  });
  socket.off("setup", () => {
    // console.log("User Left");
    socket.leave(userInfo._id);
  });
});
