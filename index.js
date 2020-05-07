const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    return Recipe.create({
      title: 'Chocolate Almond Birthday Cake',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'raspberries', 'chocolate 70%', 'almond flour', 'coconut sugar'],
      cuisine: 'paleo',
      dishType: 'dessert',
      image : 'chocolate_cake.jpg',
      duration:'120',
      creator:'BolosPaleoNor',
  });
  })

  .then( (recipe) => {
    console.log('The title of the recipe is: ', recipe.title)
    return Recipe.insertMany(data);
})

  .then( (loadrecipe) => {
    const loadrecipeTitle = [];
    for (let i=1; i<loadrecipe.length; i++){
      loadrecipeTitle.push(loadrecipe[i].title);
    }
    console.log('The data Json file was uploaded: ',loadrecipeTitle )

  })



  .catch(error => {
    console.error('Error connecting to the database', error);
  });
