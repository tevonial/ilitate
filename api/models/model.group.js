/**
 * Created by tevonial on 7/2/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: {type: String, required: true},
    custom: [{
        name: {type:String, required:true}
    }]
});

mongoose.model('Group', groupSchema);