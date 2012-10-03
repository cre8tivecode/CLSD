module.exports.admin = function(app, User) {


    app.get('/admin', function(req, res){

        if(req.session.userId){
            User.findById(req.session.userId, function (err, user){

                res.render('admin', {
                    admin : user
                });

            });


        }
        else {
            res.redirect('/');
        }
    });




};