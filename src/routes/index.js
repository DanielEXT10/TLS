const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tool = require('../models/tool');


//router.post('/add_connection', async (req,res)=>{
  //  const tool= new tool.connection.push(req.body);
    //await tool.save();
    //res.redirect('/add_connection'); 
//});
router.post('/add', async (req,res)=>{
    const tool = new Tool(req.body);
    await tool.save();
    console.log(tool);
    res.render('new-connection', {
        tool
    });
  
});

router.post('/add_connection/:id',async (req,res)=>{
    const {id} = req.params;
    await Tool.connections.push({req.body});
    res.redirect('/add');

});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Tool.update( {_id : id}, req.body);
    res.redirect('/review');
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
router.get('/review', async(req,res)=>{
    const tools = await Tool.find();
    res.render('review-job',{
        tools
    });
});
router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params;
    await Tool.remove({_id: id});
    res.redirect('/review');
});

router.get('/edit/:id', async (req,res) =>{
    const { id}  = req.params;
    const tool = await Tool.findById(id);
    res.render('edit-job',{
        tool
    });
});
module.exports = router;
