const express = require('express');
const router = express.Router();

const Tool = require('../models/tool');

router.get('/', (req,res)=>{
    res.render('index');

});
router.get('/new-job/', (req,res)=>{
    res.render('new-job');
})
module.exports = router;