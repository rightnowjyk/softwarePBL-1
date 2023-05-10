const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../model/db');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get("/", function(req,res){ //메인화면
    res.render('main')
})

router.get("/mainTimerSetting", function(req,res){ //메인타이머 설정
    res.render('mainTimerSetting')
})

router.get("/timeout", function(req,res){ //타이머 시간초과
    res.render('timeout')
})

router.post("/mainTimer", function(req,res){ //메인타이머 시작
    var time = req.body.time
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="/mainTimerSetting";</script>`);
    } else{
        var result={"time":time * 100}
        res.render('mainTimer',{data:result})
    }
})

router.get("/gameTimerSetting/:game", function(req,res){ //게임타이머 설정
    var game = req.params.game;
    result = {"game":game};
    res.render('gameTimerSetting',{data:result});
})

router.post("/gameTimer/:game", function(req,res){ //게임타이머 시작
    var game = req.params.game
    var time = req.body.time
    console.log(time)
    if(!time){
        res.send(`<script type="text/javascript">alert("타이머를 설정해주세요");
        document.location.href="/mainTimerSetting";</script>`);
    } else{
        time = time * 100;
        db.query('update gametimer set time = ? where game = game', [time], function(err, result) { 
            res.send(`<script type="text/javascript">
        document.location.href="/quiz/${game}/practice";</script>`);
        });
    }
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
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/nonsense/practice", function(req,res){ //넌센스 연습문제
    var sql = "select * from exquiz where num = 2";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/fourWord/practice", function(req,res){ //네글자 연습문제
    var sql = "select * from exquiz where num = 3";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})


router.get("/quiz/knowledge/practice", function(req,res){ //상식 연습문제
    var sql = "select * from exquiz where num = 4";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
    })
})

router.get("/quiz/flag/practice", function(req,res){ //국기 연습문제
    var sql = "select * from exquiz where num = 5";
    db.query(sql, function(err, result){
        db.query("select * from gametimer where game = game", function(err,result1){
            res.render('practice',{data:result, data1:result1})
        })
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
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numOx = 0;
        var sql = "select * from exquiz where num = 1";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/ox/:num", function(req,res){ //ox 정답(본 게임)
    db.query('select * from ox where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

var numNonsense = 0;
router.get("/quiz/nonsense", function(req,res){ //넌센스 게임(본 게임)
    numNonsense += 1;
    if(numNonsense<11){
        var sql = "select * from nonsense";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numNonsense = 0;
        var sql = "select * from exquiz where num = 2";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/nonsense/:num", function(req,res){ //넌센스 정답(본 게임)
    db.query('select * from nonsense where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

var numfourWord = 0;
router.get("/quiz/fourWord", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numfourWord += 1;
    if(numfourWord<11){
        var sql = "select * from fourword";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numfourWord = 0;
        var sql = "select * from exquiz where num = 3";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/fourWord/:num", function(req,res){ //네글자 이어말하기 정답(본 게임)
    db.query('select * from fourword where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})

var numknowledge = 0;
router.get("/quiz/knowledge", function(req,res){ //네글자 이어말하기 게임(본 게임)
    numknowledge += 1;
    if(numknowledge<11){
        var sql = "select * from knowledge";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numknowledge = 0;
        var sql = "select * from exquiz where num = 4";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/knowledge/:num", function(req,res){ //네글자 이어말하기 정답(본 게임)
    db.query('select * from knowledge where num = ?',[req.params.num], function(err, result){ 
        db.query("select * from gametimer where game = game", function(err, result1){
            res.render('gameAnswer',{data:result, data1:result1})
        })
    });
})


var numFlag = 0;
router.get("/quiz/flag", function(req,res){ //국기맞히기 게임(본 게임)
    numFlag += 1;
    if(numFlag<11){
        var sql = "select * from flag";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('game',{data:result, data1:result1})
            })
        }) 
    } else{
        numFlag = 0;
        var sql = "select * from exquiz where num = 5";
        db.query(sql, function(err, result){
            db.query("select * from gametimer where game = game", function(err, result1){
                res.render('gameEnd',{data:result, data1:result1})
            })
        })
    }  
})

router.get("/quiz/flag/:num", function(req,res){ //국기맞히기 정답(본 게임)
    db.query('select * from flag where num = ?',[req.params.num], function(err, result){ 
        res.render('gameAnswer',{data:result})
    });
})

module.exports = router