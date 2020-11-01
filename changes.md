server 폴더명 => src로 변경


controller      /  Express Route Controller  비지니스로직 여기 넣지말라
    |
service Layer   /  Service Class    비지니스 로직은 받고 지우고 CRUD같은 로직들.
    |
Data Access Layer / Mongoose ODM



controller,   DO :    / DO_NOT : 비지니스 로직 여기 넣지말라

service Layer,  DO : 비지니스 로직 넣자 , 클래스 들의 집합. router에서 분리.
                req와 res객체를 전달하지 말라. 
                상태코드와 헤더와같은 HTTP 반환 하지말자.
                DO_NOT : api호출 노노 get post 등


Data Access Layer / DO : Sql query 형태 코드 넣자 / DO_NOT : 



참고 URL : https://velog.io/@hopsprings2/%EA%B2%AC%EA%B3%A0%ED%95%9C-node.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0
