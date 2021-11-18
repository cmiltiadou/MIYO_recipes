require('dotenv').config()
let express = require('express')
let db = require('../models')
let recipe = require('../models/recipe')
const axios = require('axios')
const router = express.Router() 


router.get('/new', (req, res) => {
    db.recipe.findAll()
    .then((recipes) => {
      res.render('recipes/new')  
    })  
    .catch((error) => {
      res.status(400).render('main/404')  
    })  
  })    

/// create a POST route to create a new recipe and add it to the database 
router.post('/', (req, res) => {
    db.user.findOne({where: {name: req.body.username}})
    .then(user=>{  
        user.createRecipe({
        name: req.body.name,
        difficulty: req.body.difficulty,
        preptime: req.body.preptime,
        cooktime: req.body.cooktime,
        ingredients: req.body.ingredients,
        method: req.body.method,
        story: req.body.story,
        isRestaurant: req.body.isRestaurant,
        restaurantName: req.body.restaurantName
    })
    .then((post) => {
      res.redirect('recipes/new')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
})})

// SHOW ROUTE to show individual recipe
router.get('/:id', (req, res) => {
    db.recipe.findOne({
        where: {id: req.params.id}
    })
    .then (recipe => {
        res.render('recipes/show', {
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
    .catch (error => {
        console.error
    })
})


/// create DELETE ROUTE to delete recipes 
router.delete('/:id', (req, res) => {
    // console.log('this is the id\n', req.params.id)
    db.recipe.destroy({
        where: {id: req.params.id}
    })
    .then(deletedRecipe =>{
        // console.log('you deleted:', deletedItem)
        res.redirect('/')
    })
    .catch(error =>{
        console.error
    })
})


module.exports = router