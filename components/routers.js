const express = require("express");
const router = express.Router();
const todosController = require("./controller");

router.get("/:todoId", async (req, res) => {
  try {
    const todoId = req.params.todoId;
    // const todoInfo = await todosController.getTodo(todoId);
    const todoTasks = await todosController.getAllTodoTasks(todoId);
    if (todoTasks) {
      res.json({ todoTasks });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const todos = await todosController.getAllTodos();
    if (todos) {
      res.json({ todos });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/:todosId", async (req, res) => {
  try {
    const title = req.query.title;
    const todosId = req.params.todosId;
    const obj = await todosController.createTask(title, todosId);
    res.json(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const title = req.query.title;
    const obj = await todosController.createTodo(title);
    res.json(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:todosId", async (req, res) => {
  try {
    const todosId = req.params.todosId;
    const obj = await todosController.removeTodo(todosId);
    res.json(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const obj = await todosController.removeTask(taskId);
    res.json(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:todosId", async (req, res) => {
	try {
		const title = req.query.title;
		const todosId = req.params.todosId;
		const obj = await todosController.changeTitleTodo(todosId, title);
		res.json(obj);
	} catch (error) {
		res.status(400).send(error.message);
	}
	
})

router.patch("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const status = req.query.status;
	const title = req.query.title;
	let obj;

	console.log(status, title);

	if (title) {
		obj = await todosController.changeTitleTask(taskId, title);
	} else {
		obj = await todosController.toggleStatus(status, taskId);
	}
    res.json(obj);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
