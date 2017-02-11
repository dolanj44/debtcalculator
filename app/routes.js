var quotation = [{
              "bank_name" : 'Capital One',
              "acct": "RMB",
              "balance": "100",
              "rate": "3",
              "minimum": "rx"},
            {
              "bank_name" : 0,
              "acct": "RMB",
              "balance": "200",
              "rate": "4",
              "payment": "rx"},
           {
              "bank_name" : 1,
              "acct": "RMB",
              "balance": "100",
              "rate": "3",
              "payment": "rx"},
           {
              "bank_name" : 1,
              "acct": "RMB",
              "balance": "200",
              "rate": "5",
              "payment": "rx"},
            {
              "bank_name" : 0,
              "acct": "RMB",
              "balance": "100",
              "rate": "1.2",
              "payment": "hsf"},
            {
              "bank_name" : 0,
              "acct": "RMB",
              "balance": "200",
              "rate": "2.4",
              "payment": "hsf"},
           {
              "bank_name" : 1,
              "acct": "RMB",
              "balance": "100",
              "rate": "3",
              "payment": "hsf"},
           {
              "bank_name" : 1,
              "acct": "RMB",
              "balance": "200",
              "rate": "4.5",
              "payment": "hsf"}];

var User = require('./models/user');
module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index.ejs', { quotation: quotation,
                            user: req.user });
  });

  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage')});
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true,
  }));

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile.ejs', { user: req.user });
  });

  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email' ]}));

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/',
                                        failureRedirect: '/'}));

    app.get('/auth/google', passport.authenticate('google', {scope: ['profile','email' ]}));

    app.get('/auth/google/callback',
        passport.authenticate('google', { successRedirect: '/',
            failureRedirect: '/'}));


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  })
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}