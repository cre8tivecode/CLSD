module.exports.Therapist = function(app, Schema, mongoose) {

// Therapist Required Schemas
var User = mongoose.model('User');
var Client = mongoose.model('Client');

require('../controllers/therapist').therapist(app, User, Client);
}