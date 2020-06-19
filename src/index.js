console.log("Hello World");// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertPodcast, getPodcasts} = require('./database/podcasts');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const podcast = [
  {title: 'Two Owls'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all podcasts
app.get('/', async (req, res) => {
  res.send(await getPodcasts());
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertPodcast({title: 'Hello, now from the in-memory database!'});

  // start the server
    app.listen(3001, async () => {
        console.log('listening on port 3001');
    });
});