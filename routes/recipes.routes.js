const router = require("express").Router();
const Recipe = require("../models/Recipe.model");

router.get('/', (req, res) => {
    Recipe.find()
        .then(recipesFound => {
            console.log(recipesFound);
            res.render('recipes/recipes', recipesFound);
        })
        .catch(err => {
            console.log(err);
    })
});

router.get('/create', (req, res) => {
    res.render('recipes/new-recipe');
});

router.post('/create', (req, res) => {
    Recipe.create(req.body)
        .then(recipeCreated => {
            console.log(`The recipe ${recipeCreated.title} has been added:`, recipeCreated);
            // res.redirect('/recipes');
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/search', (req, res) => {
    const myQuery = req.query.query;

    Recipe.find({ title: { $regex: new RegExp(myQuery, 'i')}})
        .then(recipesFound => {
            console.log('Recipes found: ', recipesFound)
            res.render('recipes/recipes-search', { recipesFound });
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Recipe.findById(id)
        .then(recipe => {
            console.log('Recipe retrieved:', recipe);
            res.render('recipes/recipe-details', recipe);
        })
        .catch(err => {
            console.log(err);
    })
});

router.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    
    Recipe.findById(id)
        .then(recipeFound => {
            console.log('Recipe found:', recipeFound)
            res.render('recipes/edit-recipe', recipeFound);
        })
});

router.post('/:id/edit', (req, res) => {
    const { id } = req.params;
    const { title, description, origin, 
            image, level, rations, duration,
            isVegetarian, isVegan, ingredients,
            steps, user, creationTime, likes } = req.body;

    Recipe.findByIdAndUpdate(id, { title, description, origin, 
        image, level, rations, duration,
        isVegetarian, isVegan, ingredients,
        steps, user, creationTime, likes }, { new: true })
        .then(recipeUpdated => {
            console.log('Recipe updated:', recipeUpdated);
            // res.redirect('/recipes');
        })
});

router.post('/:id/delete', (req, res) => {
    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
        .then(() => {
            // res.redirect('/movies'))
        })
        .catch(err => {
            next(err);
        })
});

module.exports = router;