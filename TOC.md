# TOC
<!-- TOC -->

- [TOC](#toc)
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
  - [- socket 서버 구현](#ullisocket-서버-구현liul)
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
- 2020.03 ~ 2020.08 /  **코드스테이츠 이머시브 코스 20기 수료**
> **javascript**, **node.js**, async,  http, git ,data_structure, react, data_base, sql, auth, AWS,  communication skill,
   how to ask good questions 를 배울 수 있었습니다.

- 2019.03 ~ 재학 중 / **방송통신대학교 컴퓨터과학과 재학**
 

<br>

# Skill Inventory

* node.js
* express
* mongodb


<br>

# Project

## <span style="color:#c9a7ea">sprint 1</span> 

##### schema 작성 (mongoose)
  - user (유저 정보)
  - myLibrary (책 정보)
  - report (독후감)
##### api 작성
 * user
   - 회원가입
   - 로그인
* myLibrary  
  - 유저가 저장한 책 가져오기
  - 책 추가하기 
  - 책 지우기 
* report
  - 책에 작성된 독후감 가져오기
  - 독후감 추가하기
  - 독후감 지우기
  - 독후감 수정하기
  - 독후감 있는 책만 가져오기
  - 독후감이 많은 순으로 책 정렬
#####  jwt auth 구현.
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
  ---
  <br />

### 개발 목적

 코드스테이츠 20기 4주차 프로젝트로 만들게 되었습니다.
 책을 읽고나서 느꼈던 감정들을 잊지않고 **기록**하여 먼 훗날 내가 남긴 독후감을 보며 그 순간을 추억합니다. 불특정 다수와 토론방에서 나의 **생각과 가치를 공유** 하고 사고의 폭을 확장시켜 세상을 더 넓고 균형있게 바라보는데 도움을 주고싶어 만들게 되었습니다.

 <br />

### 개발 환경

* node.js / express / mongodb / mongoose / JWT
 
 <br />
 
### 개발 기능

* **도서 검색**

  로그인 없이 찾고자 하는 도서의 이름 또는 작가의 이름을 검색할 수 있다.
> 클라이언트 쪽에서 외부api를 사용해 렌더링 하였습니다.

* **평점 부여 및 저장**
  로그인 후 자신이 읽을 책을 평점을 매기고 저장합니다.



* **저장한 책 모아보기**

   저장한 책들을 한눈에 모아 볼 수 있습니다.
   <br />

* **독후감 남기기**
   저장한 책들 중 짧은 독후감을 남길 수 있습니다.
    <br />

* **마이페이지**
   나의 이름을 수정 할 수 있습니다.
    <br />


* **토론방**
   유저들과 책이름을 적고 서로 대화 할 수 있습니다.
    <br />

  ```javascript
  const book_list = bla bla
  ```
 
  해당코드로 어쩌고 저쩌고 블라 블라 브라라라

<br>

### 리팩토링
<br>
과거 어쩌고 코드를 조금 더 넓은 사용성을 위해 어쩌고 해서 어쩌고 하게 만들었다.

리팩토링 할꺼는 keys.js를 환경변수들로 만들고
각각 재사용될수 있는 것들은 모듈화 시킨다

예를 들어 statusCode 들. 
몽구스 스키마들.


* Before
  ```javascript
  const a;
  ```

* After
  ```javascript
  const b;
  ```

  Before에서 코드는 어쩌고 저쩌고인데 어떤 부분이 저쩌고 저쩌고 해서 좋지 않았다. 그렇기 떄문에 After코드로 변경하였고 그로인해 어떤부분이 향상되었다. 하지만, 여전히 어떠한 부분은 문제로 보이고 이 방법은 향후 어떤 패치로 보완하면 좋을 것 같다.