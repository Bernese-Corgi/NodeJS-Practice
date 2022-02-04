// http 내장 모듈을 받아온다.
const http = require('http');

http
  // createServer : server 객체 생성
  .createServer((request, response) => {
    // 내가 작성하는 response 응답 객체만 사용자가 볼 수 있다.
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello Server');
    response.end();
  })
  .listen(3000); // 3000번 포트로 서버를 띄운다.
