module.exports.Admin = function(app, Schema, mongoose) {

// Therapist Required Schemas
    var User = mongoose.model('User');

    require('../controllers/admin').admin(app, User);
}