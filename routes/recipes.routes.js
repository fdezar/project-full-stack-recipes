const router = require("express").Router();
const Recipe = require("../models/Recipe.model");

router.get('/', (req, res) => {
    Recipe.find()
        .then(recipesFound => {
            console.log(recipesFound);
            res.render('', recipesFound);
        })
        .catch(err => {
            console.log(err);
    })
});

router.get('/create', (req, res) => {
    res.render('');
});

router.post('/create', (req, res) => {
    Recipe.create(req.body)
        .then(recipeCreated => {
            console.log(`The recipe ${recipeCreated.title} has been added:`, recipeCreated);
            // res.redirect('/recipes');
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Recipe.findById(id)
        .then(recipe => {
            console.log('Recipe retrieved:', recipe);
            res.render('', recipe);
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
            res.render('', recipeFound);
        })
});

router.post('/:id/edit', (req, res) => {
    const { id } = req.params;
    const { /* parámetros del modelo */ } = req.body;

    Recipe.findByIdAndUpdate(id, dataToUpdate, { new: true })
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