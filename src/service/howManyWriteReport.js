module.exports = function howManyWriteReport() {
  //books 정보가 없다면 빈배열로 들어옴.
  if (books.length === 0 || reports.myLibrary === null)
    return res.status(404).send({ message: "can not found your books" }).end();

  //* 알고리즘 작업 코드.
  //report 는 모든 report
  // book 은 해당 유저의 책들
  // 레포트 북 아이디와 유저 책아이가 같은것만 추린다. mybookResult 에 저장
  let mybookResult = [];

  // reports 안에 myLibrary 의 값이 null 일경우 레포트는 있지만 책은 없는경우임.
  // 책은 지워졌지만 레포트는 남은 상태.
  reports.forEach((report) => {
    books.forEach((book) => {
      if (report.myLibrary.bookUuid === book.bookUuid) {
        mybookResult.push(report.myLibrary);
      }
    });
  });

  //각 책 정보에 count를 넣어서
  let manyOrder = [];
  mybookResult.forEach((cur) => {
    cur["count"] = 1;
    mybookResult.forEach((cu) => {
      cur.bookUuid === cu.bookUuid ? cur.count++ : "";
    });
    if (!manyOrder.includes(cur)) {
      manyOrder.push(cur);
      cur.bookRate = cur.bookRate + String(cur.count);
    }
  });

  let manyOrderSorted = manyOrder.sort((a, b) => {
    return b.count - a.count;
  });
  return manyOrderSorted;
};
