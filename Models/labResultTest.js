var mongoose = require('mongoose')
var Schema= mongoose.Schema;
var labTestResultSchema = new Schema ({
    establishement :{type:String},
    testDate: {type:String},
    reference: {type:String},
    nomTest:{type:String},
    taux:{type:Boolean}
})
module.exports = mongoose.model('labResultSchema',labTestResultSchema);