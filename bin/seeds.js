const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.model.js');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project-full-stack-recipes';

const recipes = [
    {
        title: "Classic Spaghetti Bolognese",
        description: "A hearty and flavorful pasta dish.",
        origin: "Italy",
        level: "Intermediate",
        rations: 4,
        duration: 60,
        isVegetarian: false,
        isVegan: false,
        ingredients: ["500g ground beef", "1 onion", "2 cloves garlic", "400g tomato sauce", "250g spaghetti"],
        steps: "1. Brown the beef with chopped onions and garlic. 2. Add tomato sauce and simmer. 3. Cook spaghetti separately. 4. Serve sauce over spaghetti."
    },
    {
        title: "Vegetarian Stir-Fry",
        description: "A quick and healthy vegetable stir-fry.",
        origin: "Global",
        level: "Easy",
        rations: 2,
        duration: 30,
        isVegetarian: true,
        isVegan: true,
        ingredients: ["1 bell pepper", "1 broccoli head", "1 carrot", "200g tofu", "soy sauce"],
        steps: "1. Chop vegetables and tofu. 2. Stir-fry veggies and tofu in a pan. 3. Add soy sauce for flavor. 4. Serve hot."
    },
    {
        title: "Homemade Margherita Pizza",
        description: "A classic pizza with tomato, mozzarella, and basil.",
        origin: "Italy",
        level: "Easy",
        rations: 2,
        duration: 45,
        isVegetarian: true,
        isVegan: false,
        ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Fresh basil leaves", "Olive oil"],
        steps: "1. Roll out pizza dough. 2. Spread tomato sauce. 3. Add mozzarella and basil. 4. Drizzle with olive oil. 5. Bake until golden."
    },
    {
        title: "Chicken Alfredo Pasta",
        description: "Creamy Alfredo sauce with grilled chicken over pasta.",
        origin: "Italy",
        level: "Intermediate",
        rations: 3,
        duration: 50,
        isVegetarian: false,
        isVegan: false,
        ingredients: ["300g fettuccine pasta", "1 cup heavy cream", "Grated Parmesan", "Grilled chicken breast", "Garlic"],
        steps: "1. Cook pasta according to package instructions. 2. Saute garlic in a pan. 3. Add cream and Parmesan, stir until thickened. 4. Toss in cooked pasta and grilled chicken."
    },
    {
        title: "Quinoa Salad with Lemon Vinaigrette",
        description: "A refreshing and nutritious salad with quinoa and veggies.",
        origin: "Global",
        level: "Easy",
        rations: 4,
        duration: 25,
        isVegetarian: true,
        isVegan: true,
        ingredients: ["1 cup cooked quinoa", "Cherry tomatoes", "Cucumber", "Red onion", "Lemon vinaigrette"],
        steps: "1. Combine cooked quinoa with chopped veggies. 2. Drizzle with lemon vinaigrette. 3. Toss gently. 4. Serve chilled."
    },
    {
        title: "Beef Tacos with Salsa",
        description: "Spiced beef in taco shells with fresh salsa.",
        origin: "Mexico",
        level: "Intermediate",
        rations: 5,
        duration: 40,
        isVegetarian: false,
        isVegan: false,
        ingredients: ["Ground beef", "Taco shells", "Tomatoes", "Onion", "Cilantro"],
        steps: "1. Cook ground beef with spices. 2. Prepare salsa with diced tomatoes, onion, and cilantro. 3. Fill taco shells with beef and top with salsa."
    },
    {
        title: "Mango Coconut Smoothie Bowl",
        description: "A tropical and refreshing smoothie bowl with mango and coconut.",
        origin: "Global",
        level: "Easy",
        rations: 2,
        duration: 10,
        isVegetarian: true,
        isVegan: true,
        ingredients: ["Frozen mango chunks", "Coconut milk", "Banana", "Granola", "Chia seeds"],
        steps: "1. Blend mango, coconut milk, and banana until smooth. 2. Pour into a bowl. 3. Top with granola and chia seeds. 4. Enjoy!"
    },
];

mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to Mongo Database: "${x.connections[0].name}"`);
        return Recipe.create(recipes);
    })
    .then(recipesCreated => {
        console.log(`Created ${recipes.length} recipes`);
        return mongoose.connection.close();
    })
    .then(() => {
        console.log('DB Connection closed!');
    })
    .catch((err) => {
        console.log('An error occurred:', err);
    });

module.exports = recipes;
