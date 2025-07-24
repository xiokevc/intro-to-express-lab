// =================== Setup ===================
const express = require('express');
const app = express();
const port = 3000;

// =================== Data ===================
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// =================== Routes ===================

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the server home page!');
});

// 1. Greetings route
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  res.send(`Hello there, ${username}!`);
});

// 2. Roll route
app.get('/roll/:number', (req, res) => {
  const number = parseInt(req.params.number);
  if (isNaN(number)) {
    res.send('You must specify a number.');
  } else {
    const rolled = Math.floor(Math.random() * (number + 1));
    res.send(`You rolled a ${rolled}.`);
  }
});

// 3. Collectibles route
app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index < 0 || index >= collectibles.length) {
    res.send('This item is not yet in stock. Check back soon!');
  } else {
    const item = collectibles[index];
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
  }
});

// 4. Shoes filter route using query parameters
function filterShoes(shoes, { minPrice, maxPrice, type }) {
  return shoes.filter(shoe =>
    (minPrice == null || shoe.price >= minPrice) &&
    (maxPrice == null || shoe.price <= maxPrice) &&
    (!type || shoe.type === type)
  );
}

app.get('/shoes', (req, res) => {
  const filters = {
    minPrice: parseFloat(req.query['min-price']),
    maxPrice: parseFloat(req.query['max-price']),
    type: req.query.type
  };

  if (isNaN(filters.minPrice)) filters.minPrice = null;
  if (isNaN(filters.maxPrice)) filters.maxPrice = null;

  const filteredShoes = filterShoes(shoes, filters);
  res.send(filteredShoes);
});


// =================== Listener ===================
// Listen for requests on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

