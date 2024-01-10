const mongoose = require('mongoose');
const User = require('../models/User.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/project-full-stack-recipes';

const users = [
    {
      username: "john_doe",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "Admin1",
      aboutMe: "I am a passionate home cook with a love for trying out diverse recipes from around the world. Cooking brings joy to my life, and I enjoy sharing my culinary creations with friends and family.",
    },
    {
      username: "jane_smith",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "securepass",
      aboutMe: "Food is my greatest passion! Whether it's experimenting with new flavors or perfecting classic recipes, I find joy in every step of the cooking process. Join me on my culinary journey!",
    },
    {
      username: "mike_jones",
      firstName: "Mike",
      lastName: "Jones",
      email: "mike@example.com",
      password: "mikespass",
      aboutMe: "Aspiring chef and food adventurer. My kitchen is my creative playground where I explore the art of cooking. Join me as I discover the world of flavors and share my favorite recipes.",
    },
    {
      username: "sara_williams",
      firstName: "Sara",
      lastName: "Williams",
      email: "sara@example.com",
      password: "saraspass",
      aboutMe: "Cooking is not just a hobby for me; it's a form of self-expression and a way to connect with others. In my kitchen, I find solace and joy, creating dishes that tell stories and evoke emotions.",
    },
  ];

  mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to Mongo Database: "${x.connections[0].name}"`);
        return User.create(users);
    })
    .then(usersCreated => {
        console.log(`Created ${users.length} recipes`);
        return mongoose.connection.close();
    })
    .then(() => {
        console.log('DB Connection closed!');
    })
    .catch((err) => {
        console.log('An error occurred:', err);
    });
  
  module.exports = usersSeed;
  