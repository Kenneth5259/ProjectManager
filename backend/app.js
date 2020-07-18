const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectRouter = require('./routes/projectRouter');


const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/projects')
  .then(() => {
    console.log('Connection to Projects DB Successful');
  })
  .catch(() => {
    console.log('Connection Error');
  });

app.use((bodyParser.json()));
app.use((bodyParser.urlencoded({extended: false})));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.use('/api/projects', projectRouter);

module.exports = app;
