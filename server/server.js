var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');

var plaid = require('plaid');


var configDB = require('./config/database.js');
//mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"anystringoftext",
				saveUnitialized: true,
				resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine' , 'ejs');

// app.use('/',function(req,res){
// 	res.send('Our first Express Program!');
// 	console.log(req.cookies);
// 	console.log('*************');
// 	console.log(req.session);
// });

require('./app/routes.js')(app, passport);

app.use(express.static(__dirname + '/public'));


app.listen(port);
console.log('Server running on port' + port);


// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '168680933618033',
//       xfbml      : true,
//       version    : 'v2.8'
//     });
//     FB.AppEvents.logPageView();
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>