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
    file_code:String,
    customer: String,
    operator: String,
    created_at: { type: Date, default: Date.now },
    connections:[connectionSchema]
});

module.exports = mongoose.model('tool', toolSchema);