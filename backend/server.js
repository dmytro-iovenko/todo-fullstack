// bring in express for our server setup
import express from "express";
// bring in cors to help us reach backend routes from frontend
import cors from "cors";
// allows us to make our own environment variables
import "dotenv/config";
// bring in the function that will make the connetcion to the database
import connectDB from "./config.js";
// bring in our todo model to interact with the client
import Todo from "./models/todoModel.js";

// create our express app
const app = express();

// setup a cors middleware for our express app
app.use(cors());

// choosing a port
const PORT = 8080;

// at least one basic route for testing purposes
app.get("/test", (req, res) => {
  res.json("Hello (from Server)!");
});

// a route that gets all todos and sends it to client
app.get("/todos", async (req, res) => {
  try {
    // use find methid on the model to retrieve all documents from the todos collection
    const todos = await Todo.find();
    console.log("GET /todos")
    // send those documents to the client
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// setup our server to listen on a specific port
app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
  connectDB();
});
