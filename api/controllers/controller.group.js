/**
 * Created by tevonial on 7/6/2017.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sendError = require('../config/error');

var Group = mongoose.model('Group');
var Client = mongoose.model('Client');
var Note = mongoose.model('Note');

router.get('/',             listGroups);
router.get('/client/:id',   listClients);
router.get('/note/:id',     listNotes);
router.get('/custom/:id',   getCustom);
router.put('/custom/:id',   saveCustom);
router.post('/',            create);
router.put('/:id',          update);
router.delete('/:id',       remove);
module.exports = router;


function listGroups(req, res) {
    Group.find({})
        .sort({'name' : 1})
        .select('name')
        .exec(function (err, groups) {
        if (err)    return sendError(res, 500, 'Database error');

        res.status(200).send(groups);
    });
}

function listClients(req, res) {
    Client.find({group: req.params.id})
        .sort({_id: 1})
        .select('name')
        .exec(function (err, clients) {
            if (err)    return sendError(res, 500, 'Database error');

            res.status(200).send(clients);
        });
}

function listNotes(req, res) {
    Note.find({group: req.params.id})
        .sort({'created':-1})
        .exec(function (err, notes) {
        if (err)    sendError(res, 500, 'Error retrieving notes');

        res.status(200).send(notes);
    });
}

function create(req, res) {
    Group.create(req.body, function (err, group) {
        if (err)    return sendError(res, 500, 'Database error');

        res.status(200).send(group);
    });
}

function update(req, res) {
    Group.findByIdAndUpdate(req.params.id, req.body, {new:true}, function (err, group) {
        if (err)    return sendError(res, 500, 'Database error');

        res.status(200).send(group);
    })
}

function getCustom(req, res) {
    Group.findById(req.params.id, function (err, group) {
        if (err)    return sendError(res, 500, 'Database error');

        res.status(200).send(group.custom);
    });
}

function saveCustom(req, res) {
    // Update group settings
    Group.findByIdAndUpdate(req.params.id, {custom: req.body}, {new: true}, function (err, group) {
        if (err)    return sendError(res, 500, 'Database error');

        res.status(200).send(group.custom);

        // Update client docs
        Client.find({group:req.params.id}, function (err, clients) {
            if (err)    return sendError(res, 500, 'Database error');

            clients.forEach(function (client) {

                // Remove invalid fields from client doc
                client.custom = client.custom.filter(function (clientField) {
                    return group.custom.some(function (groupField) { return groupField._id.equals(clientField._id); }) ;
                });

                // Alter remaining fields in client doc
                group.custom.forEach(function (groupField) {

                    if (client.custom.some(function (clientField) { return groupField._id.equals(clientField._id); })) {
                        // If field exists
                        client.custom.forEach(function (clientField) {
                            if (groupField._id.equals(clientField._id))
                                clientField.name = groupField.name;
                        });

                    } else {
                        // Else, add it
                        client.custom.push(groupField);
                    }
                });

                client.save();
            });
        });
    });

}

function remove(req, res) {
    Group.findByIdAndRemove(req.params.id, function (err) {
        if (err)    return sendError(res, 500, 'Database error');

        res.status(200).send();
    })
}