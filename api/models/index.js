/**
 * Created by tevonial on 7/2/2017.
 */

//================================================================================
// Database configuration
//================================================================================
var mongoose = require('mongoose');

var db = 'mongodb://www:password@ds034677.mlab.com:34677/ilitate';

mongoose.connect(db);


//================================================================================
// Model registration
//================================================================================
require('./model.client');
require('./model.contact');
require('./model.note');
require('./model.group');
require('./model.user');