/**
 * Created by tevonial on 7/2/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    client: {
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
        relationship: {type: String, required: true}
    },
    name: {
       first: {type: String, required: true},
       last: {type: String, required: true}
    },
    phone: Number,
    email: String,
    other: [{
        method: String,
        value: String
    }]
});

mongoose.model('Contact', contactSchema);