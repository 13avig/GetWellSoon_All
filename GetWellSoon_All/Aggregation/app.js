const express = require('express');
const app = express();

/**
 * Importing routes
 */

const allRoutes = require('./src/routes');

/**
 * Mapping routes
 */

app.use('/clinical-trials', allRoutes.clinicalTrials);
app.use('/national-cancer-institue', allRoutes.nationalCancerInstitute);

/**
 * To handle response
 */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});

module.exports = app;
 