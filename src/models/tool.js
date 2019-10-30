const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const connectionSchema= new Schema({
    description:String,
        connection_number: Number,
        connection_type: String,
        thread_type: String,
        operation: String,
        target_torque: Number,
        measured_torque:Number
});
const toolSchema = new Schema({

    tool_serial:String,
    tool_type:String,
    costumer: String,
    operator: String,
    created_at: Date,
    connections:[connectionSchema]
});

module.exports = mongoose.model('tool', toolSchema);