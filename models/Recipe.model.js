const { Schema, model } = require("mongoose");
const todayDate = new Date();

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    origin: String,
    image: {
        type: String,
        default: ""
    },
    level: {
        type: String,
        enum: ['Easy', 'Intermediate', 'Advanced']
    },
    rations: Number,
    duration: {
        type: Number,
        min: 0
    },
    isVegetarian: Boolean,
    isVegan: Boolean,
    ingredients: { 
        type: [ String ],
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creationTime: {
        type: Date,
        default: todayDate
    },
    likes: [ Schema.Types.ObjectId ]
});

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;