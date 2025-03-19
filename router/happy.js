const express = require('express');
const router = express.Router();

// 라우팅 설정
router.get('/', (req, res)=>{
    res.status(200).send('Get happy');
});
  
router.post('/', (req, res)=>{
    res.status(200).send('Post happy');
});
  
router.get('/:person', (req, res) => {
    const person = req.params.person;
    res.status(200).send(person);
});

module.exports = router;