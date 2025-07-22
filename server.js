const express = require('express');
const app = express();
const port = 3000;

// Route to handle /greetings/:username
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;
  const message = `What a delight it is to see you once more, ${username}.`;
  res.send(message);
});

// Route to handle /roll/:number
app.get('/roll/:number', (req, res) => {
  const number = req.params.number;

  // Validation: check if number is a valid numeric value
  if (isNaN(number)) {
    res.send('You must specify a number.');
    return; // Exit the function early
  }

  // Generate random whole number between 0 and the given number
  const max = parseInt(number);
  const roll = Math.floor(Math.random() * (max + 1));

  res.send(`You rolled a ${roll}.`);
});

// Listen for requests on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


