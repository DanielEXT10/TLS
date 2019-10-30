const express = require('express');
const router = express.Router();

const Tool = require('../models/tool');

router.post('/add', async (req,res)=>{
    const tool = new Tool(req.body);
    await tool.save();
});
router.get('/', (req,res)=>{
    res.render('index');

});
router.get('/info',(req,res)=>{
    res.render('info');
});

router.get('/log-screen', (req,res) => {
    res.render('log-screen');
});

router.get('/new-job/', (req,res)=>{
    res.render('new-job');
});
module.exports = router;