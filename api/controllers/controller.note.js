/**
 * Created by tevonial on 7/2/2017.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sendError = require('../config/error');

var Note = mongoose.model('Note');

router.get('/:id',     getDetails);
router.post('/',       create);
router.put('/',        update);
router.delete('/:id',  remove);
module.exports = router;


function getDetails(req, res) {
    Note.findById(req.params.id)
        .populate({
            path: 'clients.client',
            select: 'name'
        })
        .exec(function (err, note) {
            if (err)    return sendError(res, 500, 'Error retrieving notes');

            res.status(200).send(note);
    });
}

function create(req, res) {
    Note.create(req.body, function (err, note) {
        if (err)    return sendError(res, 500, err.message);

        res.status(200).send({_id: note._id});
    })
}

function update(req, res) {
    Note.update({_id:req.body._id}, req.body, function (err) {
        if (err)    return sendError(res, 500, 'Error saving note.');

        res.status(200).send();
    });
}

function remove(req, res) {
    Note.findByIdAndRemove(req.params.id, function (err) {
        if (err)    return sendError(res, 500, 'Datebase error.');

        res.status(200).send();
    });
}