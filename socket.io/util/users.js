"use strict";

const users = [];
/**
users = [
    {
      
        id,
        username,
        bookname.

    }

] */
//*Join user to chat

const userJoin = (id, name, bookTitle) => {
  const user = { id, name, bookTitle };

  users.push(user);

  return user;
};

//*Get current user

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

//* User leaves chat
const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0]; // [{}] 이형태로 되어있기에 [0]해줌
  }
};

const allUsers = () => {
  return users;
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  allUsers,
};
