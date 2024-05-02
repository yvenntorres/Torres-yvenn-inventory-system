const express = require('express');
const app = express();
const PORT = 5000;

// Define the index route
app.get('/', (req, res) => {
  res.send(`The server is running on PORT ${PORT}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});