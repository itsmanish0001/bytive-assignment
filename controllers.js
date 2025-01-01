import jwt from "jsonwebtoken";
import { TryCatch, ErrorHandler } from "./error.js";
import { Task } from "./schema.js";

// Login handler
const login = TryCatch(async (req, resp, next) => {
    const { secretCode } = req.body;
    if (secretCode == process.env.SECRETCODE) {
        const token = await jwt.sign({ secretCode }, "abcdef");
        return resp.cookie("user-token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 15 // 15 days
        }).send("login successfully");
    } else {
        next(new ErrorHandler("PLEASE PROVIDE VALID SECRET CODE"));
    }
});

// Create new task
const createTask = TryCatch(async (req, resp, next) => {
    const { title, description, status } = req.body;
    const result = await Task.create({ title, description, status });
    resp.send(result);
});

// Fetch all tasks
const fetchTasks = TryCatch(async (req, resp, next) => {
    const result = await Task.find({});
    resp.send(result);
});

// Fetch task by ID
const fetchTasksById = TryCatch(async (req, resp, next) => {
    const id = req.params.id;
    const result = await Task.findById(id);
    if (!result) {
        resp.send("task doesn't exist");
    }
    resp.send(result);
});

// Update task status
const updateTask = TryCatch(async (req, resp, next) => {
    const id = req.params.id;
    const { newStatus } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status: newStatus },
        { new: true }
    );
    if (!updatedTask) {
        resp.send("this task doesn't exist");
    } else {
        resp.send(updatedTask);
    }
});

// Delete task by ID
const deleteTask = TryCatch(async (req, resp, next) => {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
        resp.send("this task doesn't exist");
    } else {
        resp.send(deletedTask);
    }
});

export { login, createTask, fetchTasks, updateTask, deleteTask, fetchTasksById };
