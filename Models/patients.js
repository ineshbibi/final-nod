var mongoose = require('mongoose')
var Schema= mongoose.Schema;


var Enum = require('enum');

//var gender = new Enum ('Man', 'women' , 'other' );
var  Physical_ActivitySchema = new Schema({
    type:{type:String},
    duration:{type:Number}
});


var  NutritionSchema = new Schema({
    name:{type:String},
    type:{type:String},
    quantity:{type:Number}
});

var labTestResultSchema = new Schema ({
    establishement :{type:String},
    testDate: {type:Date},
    reference: {type:String},
    nomTest:{type:String},
    taux:{type:Number}
})

var patientSchema = new Schema({

    height : {type:Number},
    weight: {type:Number},
    physical_Activities:[Physical_ActivitySchema],
    nutrition:[NutritionSchema],
    labTests:[labTestResultSchema]

})

module.exports = mongoose.model('hello',patientSchema);