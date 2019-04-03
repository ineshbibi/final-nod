var mongoose = require('mongoose')
var Schema= mongoose.Schema;
var labTestResultSchema = new Schema ({
    establishement :{type:String},
    testDate: {type:Date},
    reference: {type:String},
    nomTest:{type:String},
    Resultat:{type:Boolean}
})
module.exports = mongoose.model('labResultSchema',labTestResultSchema);