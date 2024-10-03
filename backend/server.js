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

// data from the client stored in request.body and formated as json
app.use(express.json());

// choosing a port
const PORT = 8080;

// at least one basic route for testing purposes
app.get("/test", (req, res) => {
  res.json("Hello (from Server)!");
});

// a route that gets all todos and sends it to client (READ)
app.get("/todos", async (req, res) => {
  try {
    // use find method on the model to retrieve all documents from the todos collection
    const todos = await Todo.find();
    console.log("GET /todos");
    // send those documents to the client
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// a route that creates and adds a todo document to the database (CREATE)
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    // use create method to create a new document in the database
    const newTodo = await Todo.create(req.body);
    // send new document to the client
    res.status(201).json(newTodo);
    console.log("POST /todos");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

// a route for deleting a todo document from the database
app.delete("/todos/:id", async (req, res) => {
  try {
    // use the id from the params to find and delete the document
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    console.log(deletedTodo);
    console.log("DELETE /todos/:id");
    res.status(200).json(deletedTodo);
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
