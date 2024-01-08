const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const fileUploader = require('../config/cloudinary.config');

// GET /auth/signup
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST /auth/signup
router.post("/signup", isLoggedOut, fileUploader.single('profileImage'), (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;

  // Check that username, email, and password are provided
  if (username === "" || firstName === "" || lastName === "" || email === "" || password === "") {
    res.status(400).render("auth/signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });

    return;
  }

  if (password.length < 6) {
    res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });

    return;
  }

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Create a new user - start by hashing the password

  const newUser = {
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email
  }

  if (req.hasOwnProperty('file')) {
    newUser.profileImage = req.file.path;
  }

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      newUser.password = hashedPassword;
      // Create a user and save it in the database
      return User.create(newUser /*  { username, email, password: hashedPassword, profileImage: req.file.path } */ );
    })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render("auth/signup", {
          errorMessage:
            "Username and email need to be unique. Provide a valid username or email.",
        });
      } else {
        next(error);
      }
    });
});

// GET /auth/login
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST /auth/login
router.post("/login", isLoggedOut, (req, res, next) => {
  const { email, password } = req.body;

  // Check that username, email, and password are provided
  if (email === "" || password === "") {
    res.status(400).render("auth/login", {
      errorMessage:
        "All fields are mandatory. Please provide username, email and password.",
    });

    return;
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 6) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 6 characters long.",
    });
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send an error message that user provided wrong credentials
      if (!user) {
        res
          .status(400)
          .render("auth/login", { errorMessage: "Wrong credentials." });
        return;
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt
        .compare(password, user.password)
        .then((isSamePassword) => {
          if (!isSamePassword) {
            res
              .status(400)
              .render("auth/login", { errorMessage: "Wrong credentials." });
            return;
          }

          // Add the user object to the session object
          req.session.currentUser = user.toObject();
          // Remove the password field
          delete req.session.currentUser.password;

          res.redirect(`/auth/${user._id}`);
        })
        .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
    })
    .catch((err) => next(err));
});

// GET /auth/logout
router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render("auth/logout", { errorMessage: err.message });
      return;
    }

    res.redirect("/");
  });
});

router.get("/:id", isLoggedIn, (req, res) => {
    const { id } = req.params;
    const { currentUser } = req.session;

    User.findById(id)
      .populate('myRecipes')
      .then((user) => {
        if (user.username === currentUser.username) {
          res.render('auth/my-profile', user);
        } else {
          res.redirect('/recipes');
        }
      })
      .catch((err) => {
        console.log(err);
      })

  // const { currentUser } = req.session;
  // console.log(req.session);
  // res.render('auth/my-profile', currentUser);
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
  const { id } = req.params;
  
  User.findById(id)
      .then(userFound => {
          console.log('Recipe found:', userFound)
          res.render('auth/edit-profile', userFound);
      })
});

router.post('/:id/edit', isLoggedIn, fileUploader.single('profileImage'), (req, res) => {
  const { id } = req.params;
  const { username, firstName, lastName, email,
          password, aboutMe, myRecipes, recipesLiked } = req.body;

  const updatedUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      aboutMe: aboutMe,
      myRecipes: myRecipes,
      recipesLiked: recipesLiked
  }

  // poner que si no hay mandatory fields pues que esté mal

  if (req.hasOwnProperty('file')) {
      updatedUser.profileImage = req.file.path;
  }

  User.findByIdAndUpdate(id, updatedUser, { new: true })
      .then(userUpdated => {
          console.log('User updated:', userUpdated);
          res.redirect(`/auth/${id}`);
      })
});

router.get('/:id/delete', (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
    .then( () => {
      res.redirect('/')
    }).catch( err => next(error) );
});

router.post('/:id/delete', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  User.findByIdAndDelete(id)
      .then(() => {
          res.redirect('/');
      })
      .catch(err => {
          next(err);
      })
});

router.get('/:id/delete-image', (req, res, next) => {
  const { id } = req.params;

  User.findOneAndUpdate({ "_id": id }, { profileImage: "/images/default-icon.png" } )
    .then( () => {
      res.redirect(`/auth/${id}/edit`);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
