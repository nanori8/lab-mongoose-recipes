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
    useUnifiedTopology: true,
    useFindAndModify: false
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

  .then( (recipe) => {
    let loadrecipeTitle = [];
    for (let i=1; i<recipe.length; i++){
      loadrecipeTitle.push(recipe[i].title);
    }
    console.log('Many inserted: ', loadrecipeTitle)
    
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: '100'});
  })
  
  .then( (recipeRigatoni) => {
    console.log('The recipe Rigatoni alla Genovese was updated' )
    return Recipe.findOneAndDelete({title: 'Carrot Cake'});
    
  })

  .then( (recipeRigatoni) => {
    console.log('The Carrot Cake was sucessfuly deleted' )
     return mongoose.disconnect();
  })

  .then(() => {
    console.log('Disconnected from MongoDB');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });