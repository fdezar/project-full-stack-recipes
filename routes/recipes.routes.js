const router = require("express").Router();
const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");

const isLoggedIn = require("../middleware/isLoggedIn");

const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res) => {
  Recipe.find()
    .then((recipesFound) => {
      res.render("recipes/recipes", { recipesFound });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.get("/create", (req, res) => {
  if (!req.session.currentUser) {
    res.redirect("/auth/signup");
  }

  res.render("recipes/new-recipe");
});

router.post(
  "/create",
  isLoggedIn,
  fileUploader.single("image"),
  (req, res, next) => {
    const {
      title,
      description,
      origin,
      level,
      rations,
      duration,
      isVegetarian,
      isVegan,
      ingredients,
      steps,
    } = req.body;

    const { _id } = req.session.currentUser;

    // New recipe in order to handle image upload
    const newRecipe = {
      title: title,
      description: description,
      origin: origin,
      level: level,
      rations: rations,
      duration: duration,
      isVegetarian: isVegetarian,
      isVegan: isVegan,
      ingredients: ingredients,
      steps: steps,
      user: _id,
    };

    // Handle image upload
    if (req.hasOwnProperty("file")) {
      newRecipe.image = req.file.path;
    }

    Recipe.create(newRecipe)
      .then((recipeCreated) => {
        User.findByIdAndUpdate(
          _id,
          { $push: { myRecipes: recipeCreated._id } },
          { new: true }
        ).then(() => {
          res.redirect(`/recipes/${recipeCreated._id}`);
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  }
);

router.get("/search", (req, res) => {
  const myQuery = req.query.query;

  Recipe.find({ title: { $regex: new RegExp(myQuery, "i") } })
    .then((recipesFound) => {
      res.render("recipes/recipes-search", { recipesFound });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  let canEdit = false;

  Recipe.findById(id)
    .populate("user")
    .populate({
        path: "comments",
        select: "content -_id",
        populate: {
            path: "author",
            select: "username -_id"
        }
    })
    .then((recipe) => {
      if (!req.session.currentUser) {
        res.redirect("/auth/signup");
      }

      // Make sure user is the recipe creator in order to be able to delete or edit the recipe
      if (req.session.currentUser._id === recipe.user._id.toString()) {
        canEdit = true;
      }

      console.log(recipe);
      res.render("recipes/recipe-details", { recipe, canEdit });
    })
    .catch((err) => {
      // console.log(err);
    });
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  const { id } = req.params;

  Recipe.findById(id).then((recipeFound) => {
    res.render("recipes/edit-recipe", recipeFound);
  });
});

router.post(
  "/:id/edit",
  isLoggedIn,
  fileUploader.single("image"),
  (req, res) => {
    const { id } = req.params;
    const {
      title,
      description,
      origin,
      image,
      level,
      rations,
      duration,
      isVegetarian,
      isVegan,
      ingredients,
      steps,
      user,
      creationTime,
      likes,
      comments,
    } = req.body;

    // Updated recipe in order to handle the image
    const updatedRecipe = {
      title: title,
      description: description,
      origin: origin,
      level: level,
      rations: rations,
      duration: duration,
      isVegetarian: isVegetarian,
      isVegan: isVegan,
      ingredients: ingredients,
      steps: steps,
      user: user,
      creationTime: creationTime,
      likes: likes,
      comments: comments,
    };

    // Image handler
    if (req.hasOwnProperty("file")) {
      updatedRecipe.image = req.file.path;
    }

    Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true }).then(
      (recipeUpdated) => {
        res.redirect(`/recipes/${id}`);
      }
    );
  }
);

router.get("/:id/delete", (req, res, next) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((err) => next(error));
});

router.post("/:id/delete", isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Recipe.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/recipes");
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:id/delete-image", (req, res, next) => {
  const { id } = req.params;

  Recipe.findOneAndUpdate({ _id: id }, { image: "/images/default-recipe.png" })
    .then(() => {
      res.redirect(`/recipes/${id}/edit`);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
