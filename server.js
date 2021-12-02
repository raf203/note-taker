// Require express
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//Require HTML and API routes
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//set up the port
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });