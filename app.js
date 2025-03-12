// http 모듈을 불러옵니다.
const http = require('http');

// 서버를 생성하고 요청을 처리합니다. (callback함수)
const server = http.createServer((req, res) => {
  // 요청의 URL이 '/'이면 'Hello, World!' 메시지를 보냅니다.
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 클라이언트에게 응답 내용 전송
    res.end('Hello, World!');
});

// 서버가 3000번 포트에서 대기하도록 설정합니다.
server.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 대기 중입니다.');
});
