// Express 모듈 불러오기
const express = require('express');

// Express 애플리케이션 생성
const app = express();

app.use(express.json());

// 라우팅 설정 루트 경로에 대한 요청 처리
app.get('/happy', (req, res)=>{
  res.status(200).send('Get happy');
});

app.post('/happy', (req, res)=>{
  res.status(200).send('Post happy');
});

app.get('/happy/:person', (req, res) => {
  const person = req.params.person;
  res.status(200).send(person);
});

// 서버를 3000번 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 대기 중입니다.');
});