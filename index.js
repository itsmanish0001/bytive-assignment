import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares.js";
import { errorMiddleware } from "./error.js";
import { login, fetchTasks, createTask, updateTask, deleteTask, fetchTasksById } from "./controllers.js";
import { dbConnect } from "./database.js";

// Load environment variables
dotenv.config({
    path: "./.env",
});

// Connect to the database
dbConnect();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

// Routes
app.get('/login', login);
app.use(isAuthenticated);

app.post('/tasks', createTask);
app.get('/tasks', fetchTasks);
app.get('/tasks/:id', fetchTasksById);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

// Error handling middleware
app.use(errorMiddleware);

app.listen(5000, () => {
    console.log(`app is listening on ${port}`);
});
