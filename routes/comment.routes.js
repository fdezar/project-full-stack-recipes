const router = require("express").Router();

const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");
const Comment = require("../models/Comment.model");

// ****************************************************************************************
// POST route - create a comment of a specific post
// ****************************************************************************************

// /posts/{{post._id}}/comment
router.post('/:recipeId/comment', (req, res, next) => {
  
  const { recipeId } = req.params;
  const { _id } = req.session.currentUser;
  const { content } = req.body;

  const newComment = {
    content: content
  }
  newComment.author = _id;

  Comment.create(newComment)
  .then( newCommentCreated => {
    return Recipe.findByIdAndUpdate(recipeId, { $push: { comments: newCommentCreated._id } })
  }).then( () => {
    res.redirect(`/recipes/${recipeId}`)
  })

});

module.exports = router;