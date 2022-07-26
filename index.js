// const express = require('express');
import express, { request } from "express";
import { MongoClient } from "mongodb";
const app = express();
const PORT = 4000;
const MONGO_URL = "mongodb://127.0.0.1";

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});



app.get("/movies",async function (request, response) {
    //db.movies.find({})
    if(request.query.rating){
        request.query.rating=+ request.query.rating;
    }
    console.log(request.query);
    const movies = await client
    .db("BATCH36db")
    .collection("movies")
    .find(request.query)
    .toArray();
  response.send(movies);
});

app.get("/movies/:id", async function (request, response) {
  const { id } = request.params;
  console.log(request.params, id);
  //   const movie = movies.find((mv) => mv.id === id);
  const movie = await client
    .db("BATCH36db")
    .collection("movies")
    .findOne({ id: id });
  movie
    ? response.send(movie)
    : response.status(404).send({ msg: "movie not found" });
});

app.post("/movies",async function (request, response) {
   const data=request.body;
   //db.movies.insertMany
   const result = await client
   .db("BATCH36db")
   .collection("movies")
   .insertMany(data);
   response.send(result);
  });


app.listen(PORT, () => console.log(`App started in ${PORT}`));
