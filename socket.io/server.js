"use strict";
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
// const formatMessage = require("./util/message");
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   allUsers,
// } = require(`./util/users`);

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// const botName = `BOT`;

//NOTE emit 은 내보내는 역활.
//NOTE  on 은 emit을 받는 역활.

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

// io.on("connection", (socket) => {
//   socket.on(`joinRoom`, ({ name, bookTitle }) => {
//     const user = userJoin(socket.id, name, bookTitle);

//     //* 채팅 방 (소켓 연결 시)입장시 터미널에 아래 텍스트가 뜸
//     console.log("소켓이 연결되었어요!");

//     //* 연결이 시작 된 첫 시점에만 해당 유저에게 뜸
//     socket.emit(
//       `message`,
//       formatMessage(botName,_,user.name)
//     );

//     //* 연결을 막 시작한 유저를 제외한 모든 유저에게 아래 메시지 뜸
//     socket.broadcast.emit(
//       `message`,
//       formatMessage(
//         botName,
//           _,
//         ,`${user.username} 님께서 입장 하셨습니다.`
//       )
//     );

//   });

//   //*chatMessage 이벤트 받는 곳. 유저가 접속한 채팅 방, 그 방에 있는 유저들에게 채팅 표시됨.
//   socket.on(`chatMessage`, (msg) => {
//     const { username, bookname } = getCurrentUser(socket.id);
//     io.emit(`message`, formatMessage(username, bookname, msg));
//   });

//   //*유저가 방을 떠났을 때 이벤트 */
//   socket.on(`disconnect`, () => {
//     const { username } = userLeave(socket.id);

//     if (username) {
//       io.emit(
//         `message`,
//         formatMessage(
//           botName,_,
//           `${username} 님께서 퇴장하셨습니다.`
//         )
//       );
//       //* Leave user
//       io.emit(`leftUsers`, allUsers());
//     }
//   });
// });

// io.emit will send to all the clients
// socket.broadcast.emit will send the message to all the other clients except the newly created connection

const PORT = process.env.PORT || 3100;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
