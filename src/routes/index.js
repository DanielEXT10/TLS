const express = require('express');
const router = express.Router();

const Tool = require('../models/tool');


router.post('/add_connection', async (req,res)=>{
    const tool= new tool.connection.push(req.body);
    await tool.save();
    res.redirect('/add_connection'); 
});
router.post('/add', async (req,res)=>{
    const tool = new Tool(req.body);
    await tool.save();
    console.log(tool);
  
});
router.get('/add',(req,res)=>{
    res.render('new-connection');
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