/**
 * Created by tevonial on 7/2/2017.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sendError = require('../config/error');

var Client = mongoose.model('Client');
var Note = mongoose.model('Note');


router.get('/detail/:id',   getDetails);
router.get('/contact/:id',  getDetails);
router.get('/note/:id',     getNotes);
router.get('/file/:id',     getDetails);
router.post('/',    create);
router.put('/',     update);
router.delete('/:id', remove);
module.exports = router;


function getDetails(req, res) {
    Client.findById(req.params.id)
        .populate({
            path: 'group',
            select: 'name'
        })
        .sort({_id: -1})
        .exec(function (err, client) {
            if (err)    return sendError(res, 500, 'Database error');

            res.status(200).send(client);
        });
}

function getNotes(req, res) {
    Note.find({'clients.client': req.params.id})
        .sort({'created':-1})
        .select('title created clients')
        .exec(function (err, notes) {
            if (err)    return sendError(res, 500, err.message);

            notes.forEach(function (note) {
                note.clients = note.clients.filter(function(c) {
                    return c.client.equals(req.params.id);
                });
            });

            res.status(200).send(notes);
        });
}

function create(req, res) {
    Client.create(req.body, function (err, client) {
        if (err)    return sendError(res, 500, err.message);

        res.status(200).send({_id: client._id});
    })
}

function update(req, res) {
    Client.update({_id: req.body._id}, req.body, function (err) {
        if (err)    return sendError(res, 500, err.message);

        res.status(200).send();
    })
}

function remove(req, res) {
    Client.findByIdAndRemove(req.params.id, function (err) {
        if (err)    return sendError(res, 500, err.message);

        res.status(200).send();
    })
}