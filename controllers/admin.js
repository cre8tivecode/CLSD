module.exports.admin = function(app, User) {


    app.get('/admin', function(req, res){

        if(req.session.userId){
            User.findById(req.session.userId, function (err, user){
                User.where('role',"Therapist").find(function (err, therapist){
                    res.render('admin', {
                        therapist : therapist,
                        admin : user
                    });
                });


            });


        }
        else {
            res.redirect('/');
        }
    });




};