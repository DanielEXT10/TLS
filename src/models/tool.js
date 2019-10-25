const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toolSchema = new Schema({

    tool_serial:String,
    tool_type:String,
    costumer: String,
    operator: String,
    created_at: Date,
    connections:[{
        description:String,
        connection_number: Number,
        connection_type: String,
        thread_type: String,
        operation: String,
        target_torque: Number,
        

    }]

});

module.exports = mongoose.model('tool', toolSchema);