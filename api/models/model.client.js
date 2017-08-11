/**
 * Created by tevonial on 7/2/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    name: {
        first: {type: String, required: true},
        middle: {type: String, required: false},
        last: {type: String, required: true}
    },
    created: {type: Date, default: Date.now()},
    updated: {type: Date, default: Date.now()},
    date: {
        dob: {type: Date, required: true},
        doa: {type: Date, required: false},
        dod: {type: Date, required: false}
    },
    contact: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }],
    pic: { data: Buffer, contentType: String },
    custom: [{
        name: String,
        value: String
    }]
}).pre('update', function() {
    this.update({},{ $set: { updated: new Date() } });
});

mongoose.model('Client', clientSchema);