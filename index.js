require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const methodOverride = require('method-override')
const axios = require('axios').default;
const db = require('./models')
const recipe = require('./models/recipe')



// views (ejs and layouts) set up
app.set('view engine', 'ejs')
app.use(ejsLayouts)

// body parser middelware
app.use(express.urlencoded({extended:false}))

//method override to delete 
app.use(methodOverride('_method')) 

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
app.use('/recipes', isLoggedIn, require('./controllers/recipes'))


// home route // will display featured restaurant recipe and use Places API to pull up to date info on the restaurant
app.get('/', (req, res)=>{
    db.recipe.findOne()
    .then (recipe => {
        res.render('home', {
            name: recipe.name,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            method: recipe.method,
            story: recipe.story, 
            preptime: recipe.preptime,
            cooktime: recipe.cooktime,
            isRestaurant: recipe.isRestaurant,
            restaurantName: recipe.restaurantName
        })
    })
      .catch(err => {
        console.log(err)
      })
})
    
    


// profile route
app.get('/profile/:id', isLoggedIn, (req, res)=>{
    db.recipe.findAll({
        include: [db.user],
        where: {userId: req.user.id},
    }).then((recipes) =>{
        res.render('profile', {recipes: recipes})
    }).catch((error)=>{
        console.log(error)
        res.status(400).render('main/404')
    })
})

// restaurant route for gathering more info about a restaurant using google places API
app.get('/restaurant/:restName',  (req, res)=>{
    let restaurantName = req.params.restName

    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${restaurantName}&key=${process.env.MAPSAPIKEY}`)
      .then(apiRes => {
        let name = apiRes.data.results[0].name
        let address = apiRes.data.results[0].formatted_address
        let priceLevel = apiRes.data.results[0].price_level
        let rating = apiRes.data.results[0].rating
        let placeId = apiRes.data.results[0].place_id

        // console.log(apiRes)
        // console.log(name, address, priceLevel, rating)
        res.render('restaurants/home', {name, address, priceLevel, rating})
      })
    .catch((error)=>{
        console.log(error)
    })
})

app.listen(3000, ()=>{
    console.log(process.env.SUPER_SECRET_SECRET)
    console.log("auth_practice running on port 3000")
})