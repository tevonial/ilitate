var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send("API");
});

router.use('/client',   require('../controllers/controller.client'));
router.use('/group',    require('../controllers/controller.group'));
router.use('/note',     require('../controllers/controller.note'));

module.exports = router;
