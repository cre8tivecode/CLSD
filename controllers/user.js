module.exports.user = function(app, User) { 

// Based on the user's session get the User details


  app.post('/login', function(req, res){
    	//var user = new User(req.body.user)
    	//user.save();
    	var user = req.body.user;
    	User.findOne({ username: user.username, password: user.password}, function (err, user){
      		if(user){
        	// Start a new session
        		req.session.userId = user.id;
        		if(user.role === "Admin"){
          			res.redirect('/admin')
        		}
        		if(user.role === "Therapist"){
          			res.redirect('/therapistHome');          
        		}
      		}
      		else {
        		res.redirect('/');
      		}
	    });
	});

  app.post('/logout', function(req, res){
      req.session.destroy();
      res.redirect('/');
  });

  app.get('/logout', function(req, res){
      req.session.destroy();
      res.redirect('/');
  });

  

};