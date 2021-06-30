import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCard.js";
import Cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 8000;
const connection_url =
  "mongodb+srv://tinder_admin:uxyQz4kdaZn7hlGe@cluster0.1yjd9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// middlewares
app.use(express.json());
app.use(Cors());
// dB congig
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// API endpoints
app.get("/", (req, res) => res.status(200).send("Hello "));
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
// app.get("/tinder/card", (req, res) => res.status(200).send("Hello "));
app.get("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listener
app.listen(port, () => console.log(`listning on local host ${port}`));
