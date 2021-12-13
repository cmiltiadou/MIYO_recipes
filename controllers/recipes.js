require('dotenv').config()
let express = require('express')
let db = require('../models')
let recipe = require('../models/recipe')
const axios = require('axios')
const router = express.Router() 


router.get('/all', (req, res)=>{
    db.recipe.findAll()
    
    .then((recipes) =>{
        res.render('recipes/index', {recipes: recipes})
    }).catch((error)=>{
        res.status(400).render('404') 
    })
})

router.get('/new', (req, res) => {
    db.recipe.findAll()
    .then((recipes) => {
      res.render('recipes/new')  
    })  
    .catch((error) => {
      res.status(400).render('404')  
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
      res.status(400).render('404')
    })
})})
/// create a POST route to add a comment to a specific recipe
router.post('/:id/comments', (req, res) => {
    db.comment.create({
        author: res.locals.currentUser.name,
        content: req.body.comment,
        recipeId: req.params.id,
        userId: res.locals.currentUser.id
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('404')
    })
})

//SHOW route to render a formatted version of a specific recipe 
router.get('/:id', (req, res) => {
    db.recipe.findOne({
        where: {id: req.params.id},
        include: [db.comment]
        
    })
    .then (recipe => {
        res.render('recipes/show', {
            recipe: recipe,
            name: recipe.name,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            method: recipe.method,
            story: recipe.story, 
            preptime: recipe.preptime,
            cooktime: recipe.cooktime,
            isRestaurant: recipe.isRestaurant,
            restaurantName: recipe.restaurantName,
            id: recipe.id,
        })
    })
    .catch (error => {
        console.error
    })
})
// SHOW ROUTE to render edit form for recipe
router.get('/edit/:id', (req, res) => {
    db.recipe.findOne({
        where: {id: req.params.id}
    })
    .then (recipe => {
        res.render('recipes/edit', {
            name: recipe.name,
            ingredients: recipe.ingredients,
            method: recipe.method,
            story: recipe.story, 
            preptime: recipe.preptime,
            cooktime: recipe.cooktime,
            recipeId: recipe.id
        })
    })
    .catch (error => {
        console.error
    })
})

// PUT ROUTE to edit and UPDATE a recipe
router.put('/edit/:id', (req, res) => {
    let recipeId = req.params.id
    db.recipe.findByPk(recipeId
    )
    .then (recipe => {
        recipe.update({
            name: req.body.name,
            ingredients: req.body.ingredients,
            method: req.body.method,
            story: req.body.story, 
            preptime: req.body.preptime,
            cooktime: req.body.cooktime
        })
    .then(recipe =>{
        res.redirect(`/recipes/${req.params.id}`)
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