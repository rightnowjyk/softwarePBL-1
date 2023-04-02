const express = require('express');
const app = express(); 

app.get("/", function(req,res){
    res.send('레크레이션 담당자들을 위한 웹사이트');
})

app.listen(4000, function(req,res){
    console.log("서버 실행");
})
