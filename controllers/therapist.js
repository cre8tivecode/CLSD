module.exports.therapist = function(app, User, Client) {
	

 app.get('/therapistHome', function(req, res){
      if(req.session.userId){
          res.render('therapistHome');
        }
        else {
          res.redirect('/'); 
        }
  });


  app.get('/newTherapist', function(req, res){
    if(req.session.userId){

        User.findById(req.session.userId, function (err, user){

        
        if(user.role === "Admin"){
            console.log('admin');
          // Lets do another query to get a list of all therapists
          Client.find({},[],function (err,client) {
                  res.render('newTherapist', {
                  title: 'New Therapist',
                  client: client
                });
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


  app.post('/newTherapist', function(req, res){
    var therapist = new User(req.body.therapist);
    therapist.save(function(){
      		
      res.redirect('/therapists');
    });
  });

}
