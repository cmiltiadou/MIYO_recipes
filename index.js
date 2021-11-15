require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios').default;

var options = {
  method: 'GET',
  url: 'https://resy.p.rapidapi.com/find/dc?date=2021-11-12&seats=2',
  params: {
    lat: '37.788719679657554',
    long: '-122.40057774847898',
    day: '2021-02-14',
    party_size: '2',
    offset: '0'
  },
  headers: {
    'x-rapidapi-host': 'resy.p.rapidapi.com',
    'x-rapidapi-key': '5c3ad2845dmsh16d001ac3488d6bp1d9d8bjsneaaa1aaeec06'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});


// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})


app.listen(3000, ()=>{
    console.log(process.env.SUPER_SECRET_SECRET)
    console.log("auth_practice running on port 3000")
})