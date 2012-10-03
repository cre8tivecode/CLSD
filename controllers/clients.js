module.exports.client = function(app, Client, User) { 
  app.get('/clients', function(req, res){
    // if you have a userid go ahead
  	if(req.session.userId){
  	
 				// we have the session, now lets locate this user's list of clients 	
  			//Client.findById(obj._id, function (err, doc){
  			  // doc is a Document
  			//});
  			User.findById(req.session.userId, function (err, user){
  			  // If the user role is an Admin they can view all clients
          if(user.role === "Admin"){
            Client.find({},[],function (err,client) {
              res.render('clients', {
                title: 'Clients',
                client: client
              });
            });
          }
          // Retrieve the clients by the therapist id which is captured from the session
          else {
            Client.where('therapists',req.session.userId).find(function (err, client){
            console.log(client);
            res.render('clients', {
                title: 'Clients',
                client: client
            });
          });
          }
  			});
  	}
    // else you are not allowed here
  	else {
  	  	res.redirect('/'); 
  	}

  });
  
  app.get('/newClient', function(req, res){
  		if(req.session.userId){
  			User.findById(req.session.userId, function (err, user){
  			
  			if(user.role === "Admin"){
  				// Lets do another query to get a list of all therapists
  				User.where('role', 'Therapist').find(function (err, therapist){
         
            
  					res.render('newClient', {
  					    title: 'New Client',
  					    therapist: therapist
  					})
            
            
  				});

  			
  			}
  			else {
  				res.redirect('/');
  			}
  		  });
  		} 
  		else {
  		  res.redirect('/'); 
  		}
  });
  

  // Post the new client and udpate the therapist(s) with the client id
  app.post('/newClient', function(req, res){
  	var client = new Client(req.body.client);
    var therapists = req.body.client.therapists;
    
    // Convert the client id from and object to a simple string
    var clientId = String(client._id);

  	client.save(function(err){
      if(err){
        // handle error
      }
      else{
        // we can now update the selected users with the client id
        User.update({'_id': {$in : therapists}}, { $addToSet: { 'clients': clientId }}, { multi: true }, callback);
        function callback(err, success){
          if(err){
            console.log(err);
          }
          if(success){
              console.log('user updated');
              res.redirect('/clients');
          }
        }
      }
      // error is preventing form redirecting but the save is working ok
  });
  });
};
