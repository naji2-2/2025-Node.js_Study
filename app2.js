const express = require('express');
const path = require('path');
const mysql = require('mysql2')

const app = express();

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로 지정자(\ or /)를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

const travelList = ['뉴욕', '파리', '서울', '도쿄'];

const db = mysql.createConnection({
    host: 'localhost',
    user: 'mirim',
    password: '12345',
    database: 'traveldb'
});

db.connect((err)=>{
    if(err) {
        console.error('MySQL 연결 실패 : ', err);
        return;
    }
    console.log('MySQL 연결 성공!');
})

app.get('/', (req, res) => {

});

app.get('/travel', (req, res) => {
    res.render('travel', {travelList});

});

app.use((req, res) => {
    
});

// 서버를 3000번 포트에서 실행
app.listen(3001, () => {
    console.log('서버가 http://localhost:3001 에서 대기 중입니다.');
  });