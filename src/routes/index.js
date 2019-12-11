const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tool = require('../models/tool');



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
    const tool = await Tool.findById(id);
    await Tool.updateOne({_id:id},{$push: {connections:{"description":req.body.description, "connection_number":req.body.connection_number, "thread_type": req.body.thread_type, "operation": req.body.operation, "target_torque":req.body.target_torque}}});
    res.render('new-connection',{
        tool
    });
   console.log(tool.connections);

});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    await Tool.update( {_id : id}, req.body);
    res.redirect('/review');
});

router.get('/', (req,res) => {
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

router.get('/view-connections/:id', async (req,res)=>{
    const {id} = req.params;
    const tool = await Tool.findById(id);
    res.render('job-connections',{
        tool
    });

});

router.get('/log-connection/:id', async (req,res)=>{
    const {id} = req.params;
    const tool = await Tool.find({"connections._id": id},{connections:{$elemMatch: {_id: id}}});
    res.render('log-connection', {
        tool
        });
    console.log(tool.connections);
});

router.post('save-toruqe/:id/:max_torque',(req,res)=>{

    res.send(req.params);

}); 


module.exports = router;
