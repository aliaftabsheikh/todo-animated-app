const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
require("dotenv/config");


app.use(cors())
app.use(bodyParser.json());

//initialize express

const postsRoute = require("./routes/posts");

app.use("/posts", postsRoute);

//make a get router
app.get("/", (req, res) => {
  res.send("Hello World");
});

const StartApp = async () => {
  try {
    await mongoose.connect(
      process.env.CONNECTION_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
      (err) => {
        if (err) {
          console.log(err);
        } else console.log("Connected to MongoDB");
      }
    );

    app.listen(3000, () => {
      console.log("listening on port 3000");
    });
  } catch (err) {
    console.log(err); 
  }
};

StartApp();
