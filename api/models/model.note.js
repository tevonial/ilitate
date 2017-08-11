/**
 * Created by tevonial on 7/2/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {type: String, required: true},
    content: {type: String, required: true},
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    clients: [{
        client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
        note: String
    }],
    created: {type: Date, default: Date.now()},
    updated: {type: Date, default: Date.now()}

});

noteSchema.pre('update', function() {
    this.update({},{ $set: { updated: new Date() } });
});

mongoose.model('Note', noteSchema);