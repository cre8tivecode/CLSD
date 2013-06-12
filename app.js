var express = require('express'),
    app = express(),
    http = require('http'),
    util  = require('util'),
    hbs = require('hbs'),
    fs = require('fs'),
    headerTemplate = fs.readFileSync(__dirname + '/views/_header.hbs', 'utf8'),
    sys = require('sys'),
    mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/clsd');
var Schema = mongoose.Schema;


var MongoStore = require('connect-mongo')(express);

var conf = {
  db: {
    db: 'clsd',
    host: '127.0.0.1',
    port: 27017,  // optional, default: 27017
    username: '', // optional
    password: '', // optional
    collection: 'sessions' // optional, default: sessions
  },
  secret: '076ee61d63aa10a125ea872411e433b9'
};


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser()); 
  app.use(express.session({ 
    secret: conf.secret,
    maxAge: new Date(Date.now() + 3600000),
    store: new MongoStore(conf.db)
  }));
  
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
  console.log("You are in development mode");
  app.disable('view cache');
  app.use(express.errorHandler());
  hbsPrecompiler = require('handlebars-precompiler');
  hbsPrecompiler.watchDir(
    __dirname + "/views",
    __dirname + "/public/javascripts/templates.js",
    ['handlebars', 'hbs']
  );
    mongoose.set('debug', true)
});

var fullLayout = true;

// Routes //
app.get('/', function(req, res){

    res.render('index', {
      noHeader:true,
      title: 'Login'
    });


});

require('./models/User').User(app, Schema, mongoose);
require('./models/Client').Client(app, Schema, mongoose);
require('./models/Therapist').Therapist(app, Schema, mongoose);
require('./models/Admin').Admin(app, Schema, mongoose);

// End Routes //


// Handlebars //
var blocks = {};
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerHelper("each_with_index", function(array, fn) {
    var buffer = "";
    for (var i = 0, j = array.length; i < j; i++) {
        var item = array[i];

        // stick an index property onto the item, starting with 1, may make configurable later
        item.index = i+0;

        // show the inside of the block
        buffer += fn(item);
    }

    // return the finished buffer
    return buffer;

});

hbs.registerPartial('header', headerTemplate);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

