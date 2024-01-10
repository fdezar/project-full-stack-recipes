const mongoose = require('mongoose');
const Recipe = require('../models/Recipe.model.js');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project-full-stack-recipes';

const recipes = [
    {
        title: "Mushroom Risotto",
        description: "Creamy and savory mushroom risotto made with Arborio rice, mushrooms, and Parmesan cheese.",
        origin: "Italy",
        level: "Intermediate",
        rations: 4,
        duration: 40,
        isVegetarian: true,
        isVegan: false,
        ingredients: [
          "1 1/2 cups Arborio rice",
          "1 cup sliced mushrooms (e.g., cremini or shiitake)",
          "1 onion, finely chopped",
          "2 cloves garlic, minced",
          "1/2 cup dry white wine",
          "4 cups vegetable broth, heated",
          "1/2 cup grated Parmesan cheese",
          "2 tablespoons butter",
          "Salt and pepper to taste",
          "Chopped fresh parsley for garnish"
        ],
        steps: "1. In a pan, sauté onion and garlic until softened. \n2. Add mushrooms and cook until they release their moisture. \n3. Stir in Arborio rice and cook until lightly toasted. \n4. Pour in the white wine and cook until absorbed. \n5. Gradually add hot vegetable broth, stirring frequently until rice is creamy and cooked. \n6. Stir in Parmesan cheese and butter. \n7. Season with salt and pepper. \n8. Garnish with chopped fresh parsley.",
      },
      {
        title: "Shrimp Scampi Pasta",
        description: "Delicious shrimp scampi with linguine pasta, garlic, white wine, and a touch of lemon.",
        origin: "Italy",
        level: "Intermediate",
        rations: 4,
        duration: 30,
        isVegetarian: false,
        isVegan: false,
        ingredients: [
          "1 pound linguine pasta",
          "1 pound large shrimp, peeled and deveined",
          "4 tablespoons butter",
          "4 tablespoons olive oil",
          "4 cloves garlic, minced",
          "1/2 teaspoon red pepper flakes",
          "1/2 cup dry white wine",
          "Juice of 1 lemon",
          "Salt and black pepper to taste",
          "Chopped fresh parsley for garnish"
        ],
        steps: "1. Cook linguine pasta according to package instructions. \n2. In a pan, heat olive oil and melt butter. \n3. Add shrimp, garlic, and red pepper flakes; cook until shrimp turn pink. \n4. Pour in white wine and lemon juice, simmer for a couple of minutes. \n5. Season with salt and black pepper. \n6. Toss cooked pasta with the shrimp mixture. \n7. Garnish with chopped fresh parsley.",
      },
      {
        title: "Caprese Salad",
        description: "A refreshing and simple salad featuring tomatoes, fresh mozzarella, and basil.",
        origin: "Italy",
        level: "Easy",
        rations: 4,
        duration: 15,
        isVegetarian: true,
        isVegan: false,
        ingredients: [
          "4 large tomatoes, sliced",
          "1 pound fresh mozzarella, sliced",
          "Fresh basil leaves",
          "Extra virgin olive oil",
          "Balsamic glaze",
          "Salt and black pepper to taste"
        ],
        steps: "1. Arrange tomato and mozzarella slices on a serving platter. \n2. Tuck fresh basil leaves between tomato and mozzarella slices. \n3. Drizzle with extra virgin olive oil and balsamic glaze. \n4. Season with salt and black pepper. \n5. Serve immediately.",
      },
      {
        title: "Chicken and Vegetable Stir-Fry",
        description: "Quick and delicious stir-fried chicken with colorful vegetables in a savory sauce.",
        origin: "International",
        level: "Easy",
        rations: 4,
        duration: 25,
        isVegetarian: false,
        isVegan: false,
        ingredients: [
          "1 pound boneless, skinless chicken breasts, thinly sliced",
          "2 cups broccoli florets",
          "1 bell pepper, thinly sliced",
          "1 carrot, julienned",
          "2 tablespoons soy sauce",
          "1 tablespoon oyster sauce",
          "1 tablespoon hoisin sauce",
          "1 tablespoon sesame oil",
          "2 cloves garlic, minced",
          "1 teaspoon grated ginger",
          "Cooked rice for serving"
        ],
        steps: "1. In a wok or large pan, heat sesame oil and stir-fry chicken until browned. \n2. Add broccoli, bell pepper, carrot, garlic, and ginger; stir-fry until vegetables are tender-crisp. \n3. In a small bowl, mix soy sauce, oyster sauce, and hoisin sauce. \n4. Pour the sauce over the chicken and vegetables, tossing to coat evenly. \n5. Continue cooking until everything is well combined and heated through. \n6. Serve the stir-fry over cooked rice. \n7. Enjoy your delicious and quick chicken and vegetable stir-fry!",
     },
     {
        title: "Beef Tacos with Salsa Verde",
        description: "Savory and spicy beef tacos topped with a tangy salsa verde.",
        origin: "Mexico",
        level: "Easy",
        rations: 4,
        duration: 30,
        isVegetarian: false,
        isVegan: false,
        ingredients: [
          "1 pound ground beef",
          "1 onion, finely chopped",
          "2 cloves garlic, minced",
          "1 teaspoon ground cumin",
          "1 teaspoon chili powder",
          "1/2 teaspoon paprika",
          "Salt and pepper to taste",
          "8 small corn tortillas",
          "Salsa verde for topping",
          "Shredded lettuce and diced tomatoes for garnish"
        ],
        steps: "1. In a pan, brown ground beef with onion and garlic. \n2. Season with cumin, chili powder, paprika, salt, and pepper. \n3. Warm the corn tortillas in a dry pan or microwave. \n4. Spoon the beef mixture onto the tortillas. \n5. Top with salsa verde, shredded lettuce, and diced tomatoes. \n6. Serve and enjoy your delicious beef tacos!",
      },
      {
        title: "BBQ Pulled Pork Sandwiches",
        description: "Tender and flavorful pulled pork sandwiches with smoky BBQ sauce.",
        origin: "United States",
        level: "Intermediate",
        rations: 4,
        duration: 8,
        isVegetarian: false,
        isVegan: false,
        ingredients: [
          "2 pounds pork shoulder, trimmed",
          "1 tablespoon brown sugar",
          "1 tablespoon smoked paprika",
          "1 tablespoon garlic powder",
          "1 teaspoon onion powder",
          "1 teaspoon cayenne pepper",
          "Salt and black pepper to taste",
          "1 cup BBQ sauce",
          "4 hamburger buns",
          "Coleslaw for topping"
        ],
        steps: "1. Mix brown sugar, smoked paprika, garlic powder, onion powder, cayenne pepper, salt, and black pepper to create a dry rub. \n2. Rub the mixture onto the pork shoulder. \n3. Place the pork in a slow cooker and cook on low for 8 hours or until tender. \n4. Shred the pork with forks and mix in BBQ sauce. \n5. Toast hamburger buns and top with pulled pork and coleslaw. \n6. Serve and enjoy your BBQ pulled pork sandwiches!",
      },
      {
        title: "Quinoa Salad with Roasted Vegetables",
        description: "A nutritious and satisfying quinoa salad with a medley of roasted vegetables.",
        origin: "International",
        level: "Easy",
        rations: 4,
        duration: 35,
        isVegetarian: true,
        isVegan: true,
        ingredients: [
          "1 cup quinoa, cooked and cooled",
          "1 zucchini, diced",
          "1 red bell pepper, diced",
          "1 yellow bell pepper, diced",
          "1 red onion, diced",
          "2 tablespoons olive oil",
          "1 teaspoon dried oregano",
          "1 teaspoon smoked paprika",
          "Juice of 1 lemon",
          "Salt and black pepper to taste",
          "Fresh parsley for garnish"
        ],
        steps: "1. Preheat the oven to 400°F (200°C). \n2. Toss diced zucchini, red bell pepper, yellow bell pepper, and red onion with olive oil, oregano, and smoked paprika. \n3. Spread the vegetables on a baking sheet and roast for 20-25 minutes, or until tender. \n4. In a large bowl, combine cooked quinoa and roasted vegetables. \n5. Drizzle with lemon juice and toss to combine. \n6. Season with salt and black pepper. \n7. Garnish with fresh parsley before serving.",
      },
      {
        title: "Homemade Margherita Pizza",
        description: "Classic Margherita pizza with fresh tomatoes, mozzarella, and basil on a homemade crust.",
        origin: "Italy",
        level: "Intermediate",
        rations: 2,
        duration: 30,
        isVegetarian: true,
        isVegan: false,
        ingredients: [
          "Pizza dough (store-bought or homemade)",
          "1/2 cup pizza sauce",
          "1 1/2 cups fresh mozzarella, sliced",
          "2 tomatoes, thinly sliced",
          "Fresh basil leaves",
          "Olive oil for drizzling",
          "Salt and black pepper to taste"
        ],
        steps: "1. Preheat your oven to the temperature recommended for your pizza dough. \n2. Roll out the pizza dough on a floured surface. \n3. Spread pizza sauce over the dough, leaving a border for the crust. \n4. Arrange mozzarella slices and tomato slices on top. \n5. Bake in the preheated oven until the crust is golden and the cheese is melted. \n6. Remove from the oven and top with fresh basil leaves. \n7. Drizzle with olive oil, season with salt and black pepper, and slice. \n8. Enjoy your homemade Margherita pizza!",
      },
      {
        title: "Spicy Tuna Roll",
        description: "A flavorful sushi roll with spicy tuna, cucumber, and avocado, wrapped in seaweed and rice.",
        origin: "Japan",
        level: "Intermediate",
        rations: 4,
        duration: 50,
        isVegetarian: false,
        isVegan: false,
        ingredients: [
          "2 cups sushi rice, cooked and seasoned",
          "4 sheets nori (seaweed)",
          "1/2 pound sushi-grade tuna, diced",
          "1/4 cup mayonnaise",
          "1 tablespoon Sriracha sauce",
          "1 cucumber, julienned",
          "1 avocado, sliced",
          "Soy sauce for dipping",
          "Pickled ginger and wasabi for serving"
        ],
        steps: "1. Mix diced tuna with mayonnaise and Sriracha in a bowl. \n2. Place a bamboo sushi rolling mat on a flat surface and put a sheet of plastic wrap on top. \n3. Lay a sheet of nori, shiny side down, on the plastic wrap. Wet your hands and spread about 1/2 cup of sushi rice evenly over the nori, leaving a small border at the top. \n4. Arrange cucumber, avocado, and the spicy tuna mixture along the center of the rice. \n5. Lift the edge of the nori closest to you, and tightly roll it over the filling. Seal the edge with a little water. \n6. Continue rolling until you reach the top, sealing the edge. \n7. Using a sharp knife, wet it and slice the roll into bite-sized pieces. \n8. Serve with soy sauce, pickled ginger, and wasabi.",
      },
      {
          title: "Crispy Fried Anchovies",
          description: "An irresistible snack featuring crispy fried anchovies seasoned with herbs and spices.",
          origin: "International",
          level: "Easy",
          rations: 4,
          duration: 15,
          isVegetarian: false,
          isVegan: false,
          ingredients: [
            "1 cup fresh anchovies, cleaned and gutted",
            "1/2 cup all-purpose flour",
            "1/2 teaspoon garlic powder",
            "1/2 teaspoon smoked paprika",
            "Salt and black pepper to taste",
            "Vegetable oil for frying",
            "Lemon wedges for serving",
            "Fresh parsley for garnish"
          ],
          steps: "1. In a bowl, mix together flour, garlic powder, smoked paprika, salt, and black pepper. \n2. Heat vegetable oil in a deep pan or fryer to 350°F (175°C). \n3. Dredge the cleaned anchovies in the seasoned flour mixture, shaking off excess. \n4. Carefully place the coated anchovies into the hot oil and fry until golden brown and crispy, about 2-3 minutes. \n5. Use a slotted spoon to remove the fried anchovies and place them on a paper towel-lined plate to drain excess oil. \n6. Serve hot, garnished with fresh parsley and lemon wedges for squeezing over the top.",
    },
    {
      title: "Spanish Tortilla",
      description: "A classic Spanish omelette with potatoes and onions.",
      origin: "Spain",
      level: "Intermediate",
      rations: 4,
      duration: 30,
      isVegetarian: true,
      isVegan: false,
      ingredients: [
        "4 potatoes", 
        "1 onion", 
        "6 eggs", 
        "olive oil", 
        "salt", 
        "pepper"],
      steps: "1. Peel and thinly slice the potatoes and onion.\n2. Fry them in olive oil until golden.\n3. Beat the eggs and season with salt and pepper.\n4. Mix the eggs with the fried potatoes and onion.\n5. Pour the mixture into a pan and cook until set.\n6. Flip the tortilla and cook the other side.\n7. Serve and enjoy!",
    },
    {
      title: "Classic Ratatouille",
      description: "A classic ratatouille dish showcasing a harmonious blend of Mediterranean vegetables, bursting with rich flavors.",
      origin: "French",
      level: "Intermediate",
      rations: 4,
      duration: 45,
      isVegetarian: true,
      isVegan: true,
      ingredients: [
      "1 eggplant, diced",
      "2 zucchinis, sliced",
      "1 red bell pepper, diced",
      "1 yellow bell pepper, diced",
      "1 red onion, finely chopped",
      "4 tomatoes, diced",
      "3 cloves garlic, minced",
      "3 tablespoons olive oil",
      "1 teaspoon dried thyme",
      "1 teaspoon dried rosemary",
      "Salt and black pepper to taste",
      "Fresh basil for garnish"
      ],
      steps: "1. Preheat the oven to 375°F (190°C). \n2. In a large baking dish, combine diced eggplant, sliced zucchinis, diced red and yellow bell peppers, chopped red onion, and diced tomatoes. \n3. Drizzle olive oil over the vegetables, add minced garlic, dried thyme, and dried rosemary. Toss to coat evenly. \n4. Roast the vegetables in the preheated oven for 30-35 minutes, or until they are tender. \n5. Season the ratatouille with salt and black pepper to taste. \n6. Garnish with fresh basil before serving."
    },
    {
      title: "Lentejas a la Riojana (Spanish Lentil Stew)",
      description: "A hearty Spanish lentil stew, rich in flavors, featuring smoky chorizo and paprika, a comforting dish inspired by the region of La Rioja.",
      origin: "Spanish",
      level: "Intermediate",
      rations: 6,
      duration: 60,
      isVegetarian: false,
      isVegan: false,
      ingredients: [
        "2 cups dry green or brown lentils, rinsed",
        "1 onion, finely chopped",
        "2 carrots, diced",
        "2 chorizo sausages, sliced",
        "4 cloves garlic, minced",
        "2 bay leaves",
        "1 teaspoon smoked paprika",
        "1 teaspoon ground cumin",
        "1 can (14 oz) crushed tomatoes",
        "6 cups vegetable or chicken broth",
        "Salt and black pepper to taste",
        "2 tablespoons olive oil",
        "Fresh parsley for garnish"
      ],
      steps: "1. In a large pot, heat olive oil over medium heat. \n2. Add chopped onion, diced carrots, and sliced chorizo. Sauté until the vegetables are softened, and chorizo is slightly browned. \n3. Stir in minced garlic, smoked paprika, and ground cumin. Cook for an additional 1-2 minutes until fragrant. \n4. Add rinsed lentils, crushed tomatoes, bay leaves, and broth to the pot. Bring to a boil, then reduce heat and let it simmer for 40-45 minutes, or until lentils are tender. \n5. Season with salt and black pepper to taste. \n6. Discard bay leaves and serve the lentejas a la Riojana hot, garnished with fresh parsley."
    },
    {
      title: "Beef Gardener Meatballs",
      description: "Savory beef meatballs infused with the goodness of garden-fresh ingredients, a hearty and flavorful dish for meat lovers.",
      origin: "International",
      level: "Intermediate",
      rations: 4,
      duration: 50,
      isVegetarian: false,
      isVegan: false,
      ingredients: [
        "1 pound ground beef",
        "1/2 cup breadcrumbs",
        "1/4 cup finely grated zucchini",
        "1/4 cup finely grated carrot",
        "1/4 cup finely chopped red bell pepper",
        "2 cloves garlic, minced",
        "1 teaspoon dried thyme",
        "1 teaspoon dried rosemary",
        "Salt and black pepper to taste",
        "1/4 cup grated Parmesan cheese",
        "1/4 cup tomato sauce",
        "1 egg, beaten",
        "3 tablespoons olive oil",
        "Fresh parsley for garnish"
      ],
      steps: "1. Preheat the oven to 375°F (190°C). \n2. In a large mixing bowl, combine ground beef, breadcrumbs, grated zucchini, grated carrot, chopped red bell pepper, minced garlic, dried thyme, dried rosemary, salt, black pepper, Parmesan cheese, tomato sauce, and beaten egg. Mix until well combined. \n3. Shape the mixture into meatballs and place them on a baking sheet lined with parchment paper. \n4. Brush the meatballs with olive oil and bake in the preheated oven for 25-30 minutes, or until they are cooked through and golden brown. \n5. Garnish the beef gardener meatballs with fresh parsley before serving."
    },
    {
      title: "Buta Miso Ramen",
      description: "A comforting bowl of Buta Miso Ramen, featuring savory miso broth, tender pork, and flavorful toppings, bringing the authentic taste of Japanese ramen to your table.",
      origin: "Japanese",
      level: "Intermediate",
      rations: 4,
      duration: 60,
      isVegetarian: false,
      isVegan: false,
      ingredients: [
        "8 oz ramen noodles",
        "1 pound pork belly, thinly sliced",
        "4 cups chicken broth",
        "1/3 cup miso paste",
        "1 tablespoon soy sauce",
        "1 tablespoon sesame oil",
        "1 tablespoon mirin",
        "1 tablespoon grated ginger",
        "2 cloves garlic, minced",
        "2 green onions, sliced (for garnish)",
        "2 boiled eggs, halved (for topping)",
        "1 cup bean sprouts (for topping)",
        "1 sheet nori, cut into thin strips (for topping)",
        "1 tablespoon sesame seeds (for topping)"
      ],
      steps: "1. Cook ramen noodles according to package instructions, then drain and set aside. \n2. In a large pot, heat sesame oil over medium heat. Add sliced pork belly and cook until browned and cooked through. Remove excess fat if needed. \n3. Add minced garlic and grated ginger to the pot, sauté for 1-2 minutes until fragrant. \n4. Pour in chicken broth, miso paste, soy sauce, and mirin. Stir well to dissolve miso paste and bring the broth to a simmer. \n5. Divide the cooked ramen noodles among serving bowls. Ladle the miso broth over the noodles. \n6. Top the ramen with sliced pork belly, green onions, boiled eggs, bean sprouts, nori strips, and sesame seeds. \n7. Serve the Buta Miso Ramen hot and enjoy the rich and savory flavors."
    }
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
