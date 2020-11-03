
<img src="https://user-images.githubusercontent.com/57890052/94435910-b79bc400-01d6-11eb-8d34-333d658a00d4.png" width="45%" height="45%"></img><br/>

### Introduction
바쁜 일상 속, 단 한권의 책 조차 여유로이 읽을 수 없는 현대인을 위한 Web App 서비스입니다. 여유로운 마음으로 책을 정독하며 더 나은 삶을 살아가길 바라며 나의 생각과 가치를 불특정 다수와 토론을 통해 공유함으로써 더 풍성한 독서의 유익을 창출하길 바랍니다.

![Alt text](https://img.shields.io/badge/npm-6.14.7-green?style=plastic&logo=appveyor)
![Alt text](https://img.shields.io/badge/node-12.18.2-green?style=plastic&logo=appveyor)

### Book_square repo
- client https://github.com/HyojinLee96/Book-Square.git
- server https://github.com/jun-gyu/Book-Square_server.git 

### how to use
 - client side / client 폴더에서 npm 설치 후 실행.
 ```
 > npm install
 > npm run start
 ```
 - server side / server 폴더와 socket 폴더 각각 실행
  ```
 > npm install
 > npm start
 ```
### About BS
- 도서 검색 
  - 로그인 없이 찾고자 하는 도서의 이름 또는 작가의 이름을 검색 해보세요!
  - 평점을 매겨 저장해보세요! 단, 저장은 로그인 후 가능해요!

- 로그인 / 회원 가입
  - 이름, 이메일, 비밀번호로  간편히 회원가입을 하고 로그인 해주세요!

- 내 서재 
  - 로그인 후 검색하고 저장한 책들을 볼 수 있습니다.
  - 독후감을 쓴 책 목록, 저장한 책들을 독후감을 많이 쓴 순과 평점순으로 정렬하여 편히 모아 볼 수 있습니다. 
  
- 토론 방 
  - 불특정 다수와 실시간 채팅으로 자신의 생각을 나누어 보세요!
  - 자신이 읽은 책의 이름을 적고 채팅할 수 있어요!

- 마이페이지
  - 유저의 이름을 수정할 수 있습니다!
  
  -----
  
  # Book_square / server 포트폴리오

<!-- TOC -->

- [Book_square / server 포트폴리오](#book_square--server-포트폴리오)
- [Profile](#profile)
  - [이름](#이름)
  - [학력](#학력)
- [Skill Inventory](#skill-inventory)
- [Project](#project)

  - [<span style="color:#c9a7ea">sprint 1</span>](#sprint-1)
    - [schema 작성 (mongoose)](#schema-작성-mongoose)
    - [api 작성](#api-작성)
    - [jwt auth 구현.](#jwt-auth-구현)
    - [router 분기 처리.](#router-분기-처리)
  - [<span style="color:#c9a7ea">sprint 2</span>](#sprint-2)
    - [외부 api 사용](#외부-api-사용)
    - [유저이름 수정 api 추가.](#유저이름-수정-api-추가)
  - [<span style="color:#c9a7ea">sprint 3</span>](#sprint-3)
    
  - [개발 목적](#개발-목적)
  - [개발 환경](#개발-환경)
  - [개발 기능](#개발-기능)
  - [리팩토링](#리팩토링)

<!-- /TOC -->

<br>

# Profile

#### 이름

- 이준규

#### 학력

- 2020.03 ~ 2020.08 / **코드스테이츠 이머시브 코스 20기 수료**

  > **javascript**, **node.js**, async, http, git ,data_structure, react, data_base, sql, auth, AWS, communication skill,
  > how to ask good questions 를 배울 수 있었습니다.

- 2019.03 ~ 재학 중 / **방송통신대학교 컴퓨터과학과 재학**

<br>

# Skill Inventory

- node.js
- express
- mongodb

<br>

# Project

## <span style="color:#c9a7ea">sprint 1</span>

##### schema 작성 (mongoose)

- user (유저 정보)
- myLibrary (책 정보)
- report (독후감)

##### api 작성

- user
  - 회원가입
  - 로그인
- myLibrary
  - 유저가 저장한 책 가져오기
  - 책 추가하기
  - 책 지우기
- report
  - 책에 작성된 독후감 가져오기
  - 독후감 추가하기
  - 독후감 지우기
  - 독후감 수정하기
  - 독후감 있는 책만 가져오기
  - 독후감이 많은 순으로 책 정렬

##### jwt auth 구현.

##### router 분기 처리.

<br />

## <span style="color:#c9a7ea">sprint 2</span>

##### 외부 api 사용

- 카테고리 책 정보 가져오기 (naver API)
- xml json 변환

##### 유저이름 수정 api 추가.

<br />

## <span style="color:#c9a7ea">sprint 3</span>

- socket 서버 구현

  <br>

---

  <br>

### 개발 목적

  <br>
  
 * 책의 감상을 잊지 않고 추억하며
 * 나만의 생각을 기록 및 공유하여 사고의 폭을 넓히기 위함
  
 >책을 읽고나서 느꼈던 감정들을 잊지않고 **기록**하여 먼 훗날 내가 남긴 독후감을 보며 그 순간을 추억합니다. 불특정 다수와 토론방에서 나의 **생각과 가치를 공유** 하고 사고의 폭을 확장시켜 세상을 더 넓고 균형있게 바라보는데 도움을 주고싶어 만들게 되었습니다.

 <br />

### 개발 환경

- node.js / express / mongodb / mongoose / JWT

 <br />
 
### 개발 기능

- **도서 검색**  
  로그인 없이 찾고자 하는 도서 또는 작가의 이름으로 검색할 수 있다.

- **평점 부여 및 저장**  
  로그인 후 자신이 읽은 책에 평점을 매기고 저장합니다.

```js
router.post("/addBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const { bookUuid, bookTitle, bookAuthor, bookImage, bookRate } = req.body;
  if(!isExist){
  try {
    const isExist = await MyLibrary.findOne({ bookTitle: bookTitle });
    if (!isExist) {
      const userId = await Users.findOne({ _id: user_id });
      const myLibrary = await new MyLibrary({
        bookUuid: bookUuid,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor[0],
        bookImage: bookImage,
        bookRate: bookRate,
        user: userId,
      });
      myLibrary.save()
  }
```

> 위 코드를 통해 유저의 토큰을 확인 후 책 중복 저장을 피하기 위해 db에 같은 책 정보가 있는지 확인 후 저장합니다.

<br>
<br>

- **저장한 책 모아보기**  
   저장한 책들을 한눈에 모아 볼 수 있습니다.

```js
router.get("/getAllBooks", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  try {
    const myLibrary = await MyLibrary.find({ user: user_id }, { __v: 0 });
    if (myLibrary.length) {
      res.status(200).json(docs);
    } else {
      res.status(204).send(null); // 클라이언트에 null을 보내야하기에.
    }
  } catch (err) {
    console.error(err);
  }
});
```

> 미들웨어로 토큰을 확인 후 토큰에 들어있는 유저의 id값으로 db를 조회하여 해당 유저가 저장한 책 정보를 클라이언트에 제공합니다.
>
>    <br>
>    <br>

- **독후감 남기기**  
   저장한 책들 중 짧은 독후감을 남길 수 있습니다.

```js
if (myLibraryId === null) {
  return res.status(204).json({ code: 204, message: "your book is not found" });
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
```

> 클라이언트에서 보내준 책 id를 통해 해당 책이있는지 db에 조회 후 있다면 독후감을 추가합니다.

<br>
   <br>

- **마이페이지**  
   나의 이름을 수정 할 수 있습니다.

```js
router.put("/modifyName", checkAuthToken, async (req, res) => {
  const { user_id } = req.user;
  const modifyName = req.body.name;
  try {
    const user = await User.findOneAndUpdate(
      { _id: user_id },
      { name: modifyName }
    );
    if (user === null) {
      res.status(404).json({ code: 404, message: `can not found user` });
    } else {
      res.status(200).json({ code: 200, message: `modify userName success` });
    }
  } catch (err) {
    console.error(err.message);
  }
});
```

> mongoose method인 fincOneAndUpdate를 사용해 해당 정보를 조회 후 업데이트 합니다. 유저가 없다면 조건에 맞는 status를 보냅니다.

<br>
<br>

- **토론방**  
   유저들과 책이름을 적고 서로 대화 할 수 있습니다.
  > socket.io를 통해 채팅방을 구현 하였습니다. emit과 on을 통해 각종 이벤트에 따른 로직을 작성하였습니다.

<br>
<br>
<br>


## 리팩토링

<br>

> 노드 서버를 처음 만들 당시 서버 파일 구조에 대해서 알지 못하여 파일 구조들이 한눈에 들어오지 않았다.어디에 무엇이 있는지 알기 어려워 수정 및 추가 하는 작업시간이 더 소요 되었다. 리팩토링 해야하는 내용을 정리 해보았다. 

- 노드 파일 구조 개선
- 반복되는 코드 모듈화
- 비지니스 로직과 controller 분리

![스크린샷, 2020-11-03 15-09-52](https://user-images.githubusercontent.com/57890052/97955627-f6322900-1de9-11eb-8f6a-82ffec420a3d.png)

 

#### Before
파일 구조가 간단해도 직접 만든사람이 아니고서야 하나하나 열어보아야 어떤건지 파악이 가능합니다 . 만약 프로젝트 크기가 거대하
다면 유지보수 측면에서 매우 불편한 파일 구조가 될 것입니다 . 원하는 걸 찾기 위해선 수색하듯이 풀어 해쳐봐야 합니다
 

#### After
앞서 나온 파일 구조보다 조금 더 직관적인 파일 명들을 볼 수 있습니다 . 각 목적과 기능에 맞는 파일 명들을 보고 쉽게 찾아 갈 수 있
다 . 클린코드의 시작은 직관적인 파일명들에서 시작됩니다 . 파일명에 따라 기능이 분리되어야 코드 파일 또한 각 기능만 들어있는 모듈
처럼 정리 되어 작성자가 아니여도 개발을 이어기가 쉬울것 같습니다 .

#### 추가 할 점
현재 위에서 나열한 리팩토링은 계속 진행 중이며 클린코드와 유지보수에 좋은 코드를 고민하며 만들어가고 있습니다 .
 
