const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){ //메인화면
    res.render('main')
})

router.get("/quiz", function(req,res){ //퀴즈 카테고리
    res.render('quiz')
})

router.get("/action", function(req,res){ //액션 카테고리
    res.render('action')
})

router.get("/quiz/ox/practice", function(req,res){ //OX 연습문제
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/nonsense/practice", function(req,res){ //넌센스 연습문제
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/fourWord/practice", function(req,res){ //네글자 연습문제
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})


router.get("/quiz/knowledge/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/flag/practice", function(req,res){ //국기 연습문제
    var sql = "select * from exquiz where num = 5";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/ox/practice/answer", function(req,res){ //OX 연습문제 정답
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/nonsense/practice/answer", function(req,res){ //넌센스 연습문제 정답
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/fourWord/practice/answer", function(req,res){ //네글자 연습문제 정답
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/knowledge/practice/answer", function(req,res){ //상식 연습문제 정답
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/flag/practice/answer", function(req,res){ //국기맞히기 연습문제 정답
    var sql = "select * from exquiz where num = 5";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})


var numOx = 0;
router.get("/quiz/ox", function(req,res){ //OX 게임(본 게임)
    numOx += 1;
    if(numOx<11){
        var sql = "select * from ox";
        db.query(sql, function(err, result){
            res.render('game',{data:result})
        }) 
    } else{
        numOx = 0;
        var sql = "select * from exquiz where num = 1";
        db.query(sql, function(err, result){
            res.render('gameEnd',{data:result})
        })
    }  
})

var numFlag = 0;
router.get("/quiz/flag", function(req,res){ //국기맞히기 게임(본 게임)
    numFlag += 1;
    if(numFlag<11){
        var sql = "select * from flag";
        db.query(sql, function(err, result){
            res.render('game',{data:result})
        }) 
    } else{
        numFlag = 0;
        var sql = "select * from exquiz where num = 5";
        db.query(sql, function(err, result){
            res.render('gameEnd',{data:result})
        })
    }  
})

router.get("/quiz/flag/:num", function(req,res){ //국기맞히기 정답(본 게임)
    db.query('select * from flag where num = ?',[req.params.num], function(err, result){ 
        res.render('gameAnswer',{data:result})
    });
})

module.exports = router