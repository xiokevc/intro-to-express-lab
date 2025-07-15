// 1. Be Polite, Greet the User
// Import Express
const express = require('express');
const app = express();
const port = 3000;

// Route to handle /greetings/:username
app.get('/greetings/:username', (req, res) => {
  const username = req.params.username;

  // Create a custom greeting message
  const message = `What a delight it is to see you once more, ${username}.`;

  res.send(message);
});

// Listen for requests on port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// 2. Rolling the Dice