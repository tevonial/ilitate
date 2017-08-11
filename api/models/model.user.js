/**
 * Created by tevonial on 7/8/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String, required: true}
    }
});

mongoose.model('User', userSchema);