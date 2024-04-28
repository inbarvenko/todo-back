
const express = require("express");
const router = express.Router();
const todosController = require('./controller');

router.get("/:todoId", async (req, res) => {
	try {
		const todoId = req.params.todoId;
		const todoInfo = await todosController.getTodo(todoId);
		const todoTasks = await todosController.getAllTodoTasks(todoId);
		res.json({todoInfo, todoTasks});
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});

router.get("/", async (req, res) => {
	try {
		const todos = await todosController.getAllTodos();
		res.json({todos});
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/:todosId", async (req, res) => {
	try {
		const title = req.query.title;
		const todosId = req.params.todosId;
		const obj = await todosController.createTask(title, todosId);
		res.json(obj);
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});

router.post("/", async (req, res) => {
	try {
		const title = req.query.title;
		console.log('req >>>', req.query);
		const obj = await todosController.createTodo(title);
		res.json(obj);
	}
	catch (error) {
		res.status(400).send(error.message);
	}
});

module.exports = router;