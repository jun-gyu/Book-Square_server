module.exports = function theBooksWithReport(books, reports) {
  //books 정보가 없다면 빈배열로 들어옴.
  if (books.length === 0 || reports.myLibrary === null)
    return res.status(404).send({ message: "can not found your books" });

  // 유저가 저장한 책들의 bookUuid와 레포트가 있는 책 정보의 bookUuid를 비교하여 레포트가 있는
  //책의 bookUuid와 같다면 해당 레포트 책 bookUuid를 theBooksWithReport에 저장.

  let mybookResult = [];
  reports.forEach((report) => {
    books.forEach((book) => {
      if (report.myLibrary.bookUuid === book.bookUuid) {
        mybookResult.push(report.myLibrary);
      }
    });
  });

  let result = mybookResult.reduce((prev, now) => {
    if (!prev.some((obj) => obj.bookUuid === now.bookUuid)) {
      prev.push(now);
    }
    return prev;
  }, []);
  return result;
};
