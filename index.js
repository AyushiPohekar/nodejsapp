// const express = require('express');
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
// import cors from 'cors';

dotenv.config();
console.log(process.env.MONGO_URL);

const app = express();

const PORT = process.env.PORT || 4000;

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌😊");
  return client;
}

const client = await createConnection();
// app.use(core())
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

app.delete("/movies/:id", async function (request, response) {
    //db.movie.deleteOne({id:"101"})
    const { id } = request.params;
    console.log(request.params, id);
  
    const result = await client
      .db("BATCH36db")
      .collection("movies")
      .deleteOne({ id: id });
    result.deletedCount>0
      ? response.send({msg:"movie successfully deleted"})
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

  app.put("/movies/:id", async function (request, response) {
    
    const { id } = request.params;
    console.log(request.params, id);
    const data=request.body;
    //db.movies.updateOne({id:"101"},{$set:data})
    const result = await client
      .db("BATCH36db")
      .collection("movies")
      .updateOne({id:id},{$set:data})
    result.modifiedCount>0
      ? response.send({msg:"movie successfully updated"})
      : response.status(404).send({ msg: "movie not found" });
  });


app.listen(PORT, () => console.log(`App started in ${PORT}`));
