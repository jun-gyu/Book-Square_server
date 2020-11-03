const users = require("./users");
const myLibrary = require("./myLibrary");
const report = require("./report");
const categorySearch = require("./categorySearch");
const {Router} = require('express')

const router = () =>{
  const app= Router();
app.use("/users", users);
app.use("/myLibrary", myLibrary);
app.use("/report", report);
app.use("/categorySearch", categorySearch);
return app;
}
module.exports = router