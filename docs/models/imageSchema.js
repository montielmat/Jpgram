const {Schema,model} = require("mongoose");

const imageSchema = new Schema({
    title:String,
    description:String,
    filename:String,
    path:String,
    mimetyoe:String,
    size:Number,
    date: {type: Date, default: Date.now()}
})

module.exports = model('Image', imageSchema);