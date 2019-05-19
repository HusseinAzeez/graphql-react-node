// Load dotenv variables
require('dotenv').config();

// Standard libraries imports
const path = require('path');

// Third-party imports
const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');

// Local imports
const schema = require('./schema/schema');

// Initilize env variables
const { PORT = 5000, MONGO_URI, NODE_ENV } = process.env;

// Connect to the database
mongoose.connect(MONGO_URI, { useNewUrlParser: true }, () =>
  console.log('Database connection established'),
);
// Initilize the express server
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// Serve client/build/index.html after deployment
if (NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));
  // Server index.html whenever the user hit any other routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
