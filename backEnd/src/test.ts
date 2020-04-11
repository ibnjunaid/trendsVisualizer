import mongoose = require("mongoose");

let db = mongoose.connect('mongodb://127.0.0.1:27017/TwitterVisual');
db.then((connection)=>{
    console.log(connection);
    let testSchema = new mongoose.Schema({
        name : String,
        _class : Number
    })
    let testModel = mongoose.model('test',testSchema);
    let testData = new testModel({
        name :"osama",
        _class : 11
    })
    testData.save();
}).catch((err)=>{
    console.log(err);
}
)