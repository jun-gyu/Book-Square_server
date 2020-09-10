const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");
const MyLibrary = require("../../models/Mylibrary");
const Users = require("../../models/User");
const { checkAuthToken } = require("../../middleware/auth");
/*
 * myLibrary/getAllBooks
 */

router.get("/getAllBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;

  await MyLibrary.find({ user: user_id }, { __v: 0 }, (err, docs) => {
    if (err) return res.status(404).send(err); //서버는 요청받은 리소스를 찾을 수 없습니다
    !docs.length
      ? res.status(200).send({ message: "empty Library" })
      : res.status(200).json(docs);
  });
});

router.post("/addBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = req.body;

  try {
    const userId = await Users.findOne({ _id: user_id });
    await MyLibrary.create({
      bookUuid: bookUuid,
      bookTitle: bookTitle,
      bookAuthor: bookAuthor[0],
      bookImage: bookImage,
      bookRate: bookRate,
      user: userId,
    });

    // const   await
    //send 수정해야됩니다 지금은 db에 저장이 되는지 보고있슴다
    res.status(200).send({ message: "add Books success" });
  } catch (err) {
    res.status(403).send(err);
  }
});

// myLibrary book delete
router.post("/deleteBooks", checkAuthToken, async (req, res) => {
  const { bookUuid } = req.body;
  //bookUuid 에 맞는 ref 북 리스트를 삭제한다.
  await MyLibrary.findOneAndRemove({ bookUuid: bookUuid }, (err) => {
    if (err) return res.status(401).send(err);
  });
  await Report.findOneAndRemove({ bookUuid: bookUuid }, (err) => {
    if (err) return res.status(401).send(err);
    res.status(200).send(`delete reportBooks & books success`);
  });
});

module.exports = router;
