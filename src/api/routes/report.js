const express = require("express");
const router = express.Router();
const Report = require("../../models/Report");
const MyLibrary = require("../../models/MyLibrary");
const { checkAuthToken } = require("../middleware/auth");
const theBooksWithReport = require("../../service/theBooksWithReport");
const howManyWriteReport = require("../../service/howManyWriteReport");
//* bookUuid 에 맞는 모든 report 요청 , post인 이유는 bookUuid를 받기위함.
router.post("/getAllReport", checkAuthToken, async (req, res) => {
  const { bookUuid } = req.body;

  try {
    const report = await Report.find({ bookUuid: bookUuid });
    if (report.length === 0) {
      return res.status(204).send(null);
    }
    res.status(200).send(report);
  } catch (err) {
    console.error(err.message);
  }
});

//* bookUuid 를 추가하여 report 생성.
router.post("/addReport", checkAuthToken, async (req, res) => {
  const { bookUuid, reportUuid, reportMemo } = req.body;
  try {
    //* bookUuid 는 Report 가 ref하고있는 책을 _id 대신 찾기 위해 설정해놓음
    const myLibraryId = await MyLibrary.findOne(
      { bookUuid: bookUuid },
      {
        bookUuid: 0,
        bookTitle: 0,
        bookAuthor: 0,
        bookImage: 0,
        bookRate: 0,
        user: 0,
        __v: 0,
      }
    );
    if (myLibraryId === null) {
      return res
        .status(204)
        .json({ code: 204, message: "your book is not found" });
    } else {
      const report = await new Report({
        reportUuid: reportUuid,
        reportMemo: reportMemo,
        bookUuid: bookUuid,
        myLibrary: myLibraryId,
      });
      report.save((err) => {
        if (err) throw err;
        res.status(200).send({ code: 200, message: "add Report success" });
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//* uuid는 중복율이 굉장히 낮아 uuid로만 report를 찾아 삭제하는 요청.
router.post("/deleteReport", checkAuthToken, async (req, res) => {
  const { reportUuid } = req.body;

  try {
    const report = await Report.deleteOne({ reportUuid: reportUuid });

    if (!report.deletedCount) {
      return res
        .status(404)
        .send({ code: 404, message: "report is not found" });
    } else {
      res.status(200).send({ message: "delete report success" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//* updateReport
router.put("/updateReport", checkAuthToken, async (req, res) => {
  const { reportUuid, reportMemo } = req.body;
  try {
    const report = await Report.findOneAndUpdate(
      { reportUuid: reportUuid },
      { reportMemo: reportMemo }
    );

    if (report === null) {
      return res
        .status(204)
        .send({ code: 204, message: "report is not found" });
    } else {
      res.status(200).send({ code: 200, message: "success updateReport" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//* 독후감이 있는 책만 불러오는 작업.
router.get("/theBooksWithReport", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;

  //user_id 로 유저에 맞는 책 조회 후 각 책들의 uuid를 추출, report의 bookUuid와 맞는 책들만 보내줌.

  try {
    // 유저가 추가한 책 목록들의 bookUuid만 반환
    const books = await MyLibrary.find(
      { user: user_id },
      {
        _id: 0,
        bookTitle: 0,
        bookAuthor: 0,
        bookImage: 0,
        bookRate: 0,
        user: 0,
        __v: 0,
      }
    );

    /* Report가 가지고 있는 myLibrary ObjectId 들을 populate를 통해
     * ObjectId가 아닌 책 정보가 표시되게끔 하는 작업.
     */

    const reports = await Report.find(
      {},
      { _id: 0, bookUuid: 0, reportUuid: 0, reportMemo: 0, date: 0, __v: 0 }
    )
      .populate("myLibrary", [
        "bookUuid",
        "bookTitle",
        "bookAuthor",
        "bookImage",
        "bookRate",
      ])
      .exec();

    const result = theBooksWithReport(books, reports);

    if (result.length !== 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send({ message: "can not found your report books" });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//* report 가 가장 많은 순서대로 책정보를 전달.
router.get("/howManyWriteReport", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;

  /*
   * user_id 로 유저에 맞는 책 조회 후 각 책들의 uuid를 추출, report의 bookUuid와 맞는 책들만 보내줌.
   */
  try {
    // 유저가 추가한 책 목록들의 bookUuid만 반환
    const books = await MyLibrary.find(
      { user: user_id },
      {
        _id: 0,
        bookTitle: 0,
        bookAuthor: 0,
        bookImage: 0,
        bookRate: 0,
        user: 0,
        __v: 0,
      }
    );

    // Report가 가지고 있는 myLibrary ObjectId 들을 populate를 통해
    // ObjectId가 아닌 책 정보가 표시되게끔 하는 작업.

    const reports = await Report.find(
      {},
      { _id: 0, bookUuid: 0, reportUuid: 0, reportMemo: 0, date: 0, __v: 0 },
      (err) => {
        if (err) return res.status(404).send(err);
      }
    )
      .populate("myLibrary", [
        "bookUuid",
        "bookTitle",
        "bookAuthor",
        "bookImage",
        "bookRate",
      ])
      .exec();

    const manyOrderSorted = howManyWriteReport(books, reports);

    // sort된 값의 유무에 따라 신호 달라짐.
    if (manyOrderSorted.length !== 0) {
      res.status(200).json(manyOrderSorted);
    } else {
      res.status(404).send({ message: "couldn't work that what you wanted" });
    }
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
