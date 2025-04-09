const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();
const app = express();

app.use(methodOverride('_methoid'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

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
    const query = 'SELECT id, name FROM travellist'
    db.query(query, (err, results)=>{
        const travelList = results;
        res.render('travel', {travelList});
    });
});

app.get('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(query, [travelId], (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(results.length === 0){
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('travelDetail', {travel});
    });
});

app.post('/travel', (req, res) => {
    const { name } = req.body;
    const _query = 'INSERT INTO travellist (name) VALUE (?)';
    db.query(_query, [name], (err, result) => {
        if(err) {
            console.error('데이터베이스 퀴리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/travel');
    });
});

app.get('/add-travel', (req, res) => {
    res.render('addTravel');
})

app.put('/travel/:id', (req, res) => {
    const travelId = req.params.id;
    const { name } = req.body;
    const _query = 'UPDATE travellist SET name=? WHERE id=?';
    db.query(_query, [name, travelId], (err, results) => {
        if(err) {
            console.error('DB 쿼리 실패 : ', err);
            res.status(500).send('DB 서버 에러');
            return;
        }
        res.render('updateSuccess');
    });
});

app.get('/travel/:id/edit', (req, res) => {
    const travelId = req.params.id;
    const query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(query, [travelId], (err, results) => {
        if(err) {
            console.error('데이터베이스 쿼리 실패 : ', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if(results.length === 0){
            res.status(404).send('여행지를 찾을 수 없습니다.');
            return;
        }
        const travel = results[0];
        res.render('editTravel', {travel});
    });
});

// 따로 경로를 지정하지 않음(모든 경로에 대해서 처리)
app.use((req, res) => {
    
});

// 서버를 3000번 포트에서 실행
app.listen(3001, () => {
    console.log('서버가 http://localhost:3001 에서 대기 중입니다.');
  });