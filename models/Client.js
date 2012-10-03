module.exports.Client = function(app, Schema, mongoose) {
var ClientSchema = new Schema({
  firstName : { type: String }, 
  lastName : { type: String },
  email : { type: String },
  parentName: {type: String},
  parentEmail: {type: String},
  dob: {type: Date},
  address : { type: String },
  state : { type: String },
  city: {type: String},
  postalCode: {type: Number},
  phone1: { type: String },
  phone2: {type: String },
  diagnosis: {type: String},
  supportCoordinator: {type: String},
  dayTreatmentOccurs: {type: String},
  timeTreatmentOccurs: {type: String},
  evaluationRate: {type: Number},
  ongoingRate: {type: Number},
  billedService: {type: Number},
  service: {type: Number},
  occupational: {type: Number},
  physical: {type: Number},
  speech: {type: Number},
  therapists: []
  
});

mongoose.model('Client', ClientSchema);
var Client = mongoose.model('Client');
var clientOne = new Client({
    firstName : "John", 
    lastName : "Doe",
    email : "johndoe@hotmail.com",
    parentName: "Mary Doe",
    parentEmail: "marydoe@hotmail.com",
    dob: "1995-04-02 00:00:00",
    address: "132 Beckel St",
    state: "Arizona",
    city: "Phoenix",
    postalCode: "85032",
    phone1: "602-456-9821",
    phone2: "",
    diagnosis: "Depression",
    supportCoordinator:"Lisa Walters",
    dayTreatmentOccurs:"Monday",
    timeTreatmentOccurs:"10:00 AM",
    evaluationRate: "45.00",
    ongoingRate: "45.00",
    billedService: "2",
    service: "",
    occupational:"0",
    physical:"0",
    speech:"0",
    id:"5672718328482718282928",
    therapists: [
        "500274d1aa8b0e111b000002"
    ]
    
});
var clientTwo = new Client({
    firstName : "Benny", 
    lastName : "Davis",
    email : "beenyD@hotmail.com",
    parentName: "Bonnie Davis",
    parentEmail: "bonnieD@hotmail.com",
    dob: "2002-12-12 00:00:00",
    address: "444 State St",
    state: "Arizona",
    city: "Phoenix",
    postalCode: "85029",
    phone1: "602-564-1211",
    phone2: "",
    diagnosis: "Depression",
    supportCoordinator:"Lisa Walters",
    dayTreatmentOccurs:"Monday",
    timeTreatmentOccurs:"08:00 AM",
    evaluationRate: "85.00",
    ongoingRate: "85.00",
    billedService: "1",
    service: "",
    occupational:"0",
    physical:"0",
    speech:"0",
    therapists: [
        "500274d1aa8b0e111b000002"
    ]
    
});
//clientOne.save();
//clientTwo.save();


//Client.find({},[],function(err,client) {
  //console.log(client);
//});

var User = mongoose.model('User');

require('../controllers/clients').client(app, Client, User);
}

