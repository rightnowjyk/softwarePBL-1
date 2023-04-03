const express = require('express')
const router = express.Router();
const db = require('../model/db');

router.get("/", function(req,res){
    res.render('main')
})

router.get("/quiz", function(req,res){
    res.render('quiz')
})

router.get("/behavior", function(req,res){
    res.render('behavior')
})

module.exports = router