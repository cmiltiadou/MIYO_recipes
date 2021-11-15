let express = require('express')
let db = require('../models')
let router = express.Router()


/// create a POST route to create a new recipe and add it to the database 
router.post('/', (req, res) => {
    db.recipes.create({
      name: req.body.dishName,
      content: req.body.content,
      userId: req.body.userId
    })
    .then((post) => {
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })