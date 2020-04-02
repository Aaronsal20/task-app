const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/tasks');

const app = express();
console.log(process.env.MONGO_ATLAS_PW)

mongoose.connect("mongodb+srv://aaron123:1k0DqdKvhYlLjOWG" + "@cluster0-xr8lx.mongodb.net/node-ecom?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to database');
})
.catch(() => {
  console.log('Connection failed');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts", postRoutes);


module.exports = app;

