const express = require('express')
const router = express.Router();
const db = require('../model/db');

router.get("/", function(req,res){
    res.render('main')
})

router.get("/quiz", function(req,res){
    res.send("퀴즈 카테고리")
})

router.get("/behavior", function(req,res){
    res.send("행동 카테고리")
})

module.exports = router