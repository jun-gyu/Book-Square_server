"use strict";
const moment = require("moment");

const formatMessage = (name, bookTitle, message) => {
  return {
    name,
    bookTitle,
    message,
    time: moment().format(`h:mm a`),
  };
};

module.exports = formatMessage;
