const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
// __dirname : 현재 디렉토리의 절대경로
// path.join : 경로 지정자(\ or /)를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
    const _query = 'SELECT id, name FROM travellist'
    db.query(_query, (err, results)=>{
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const travelList = results;
        res.render('travel', {travelList});
    });
});

app.use((req, res) => {
    
});

// 서버를 3000번 포트에서 실행
app.listen(3001, () => {
    console.log('서버가 http://localhost:3001 에서 대기 중입니다.');
  });