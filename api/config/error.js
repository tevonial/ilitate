/**
 * Created by tevonial on 6/24/2017.
 */

module.exports = function (res, status, msg) {
    res.status(status).json({message:msg});
};