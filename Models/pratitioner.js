var mongoose = require('mongoose')
var Schema= mongoose.Schema;

var pratitionerSchema = new Schema({

    firstName : {type:String},
    lastName: {type:String},
    email:{type:String},
    Adresse:{type:String},
    phoneNumber:{type:String},
    speciality:{type:String}
})

module.exports = mongoose.model('pratitioner',pratitionerSchema);