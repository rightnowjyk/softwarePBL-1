const express = require('express')
const router = express.Router();
const db = require('../model/db');

router.get("/", function(req,res){
    res.render('main')
})

router.get("/quiz", function(req,res){
    res.render('quiz')
})

router.get("/action", function(req,res){
    res.render('action')
})

router.get("/quiz/ox/practice", function(req,res){
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/nonsense/practice", function(req,res){
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/fourWord/practice", function(req,res){
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})


router.get("/quiz/knowledge/practice", function(req,res){
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        res.render('practice',{data:result})
    })
})

router.get("/quiz/ox/practice/answer", function(req,res){
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/nonsense/practice/answer", function(req,res){
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/fourWord/practice/answer", function(req,res){
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/knowledge/practice/answer", function(req,res){
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        res.render('practiceAnswer',{data:result})
    })
})

router.get("/quiz/ox", function(req,res){
    var sql = "select * from ox";
    db.query(sql, function(err, result){
        res.render('game',{data:result})
    })
    
})

router.get("/quiz/ox/end", function(req,res){
    var sql = "select * from exquiz where num = 1";
    db.query(sql, function(err, result){
        res.render('gameEnd',{data:result})
    })
})


module.exports = router