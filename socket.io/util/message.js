"use strict";
const moment = require("moment");

const formatMessage = (username, bookname, text) => {
  return {
    username,
    bookname,
    text,
    time: moment().format(`h:mm a`),
  };
};

module.exports = formatMessage;
