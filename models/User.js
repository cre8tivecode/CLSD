module.exports.User = function(app, Schema, mongoose) {

// Need a User Schema for the application  
var UserSchema = new Schema({
  username : { type: String, unique:true }, 
  password : { type: String, unique:true },
  firstName: { type: String},
  lastName: {type: String},
  email: {type: String},
  role : { type: String },
  clients: []
});

mongoose.model('User', UserSchema);
// User will be passed as the User Schema
var User = mongoose.model('User');

// create a mock user
 var userAdmin = new User({
     username : "admin", 
     password : "admin",
     role : "Admin",
     firstName : "Bob",
     lastName : "Hermann"
 });
//userAdmin.save();

// create a mock therapist
 var userTherapist = new User({
 username : "therapist",
 password : "therapist",
 firstName: "John",
 lastName: "Doe",
 role : "Therapist"
});
//userTherapist.save();

var userTherapist2 = new User({
  username : "therapist123",
  password : "therapist123",
  firstName: "Ron",
  lastName: "Jacobs",
  role: "Therapist"
});
//userTherapist2.save();

// find all users example
User.find({},[],function(err,user) {
  console.log(user);
});


// pass on User object to the user controller
require('../controllers/user').user(app, User);

};