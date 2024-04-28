const db = require('../db/connection.js');

const todosController = {
  getAllTodoTasks: async (todosid) => {
    return await db
      .many("SELECT * FROM tasks WHERE todosid = ($1)", todosid)
      .then((data) => {
        // console.log("DATA:", data);
        return data;
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  },
  getTodo: async (todosid) => {
    return await db
      .one("SELECT title FROM todos WHERE id = ($1)", todosid)
      .then((data) => {
        // console.log("DATA:", data);
        return data;
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  },
  getAllTodos: async () => {
    return await db
    .many("SELECT * FROM todos")
    .then((data) => {
      console.log("DATA:", data);
      return data;
    })
    .catch((error) => {
      console.log("ERROR:", error);
    });
  },
  createTask: async (title, todo_id)  => {
    console.log(title, todo_id);
    return await db
      .one("INSERT INTO tasks (todosid, title) VALUES ($1, $2) RETURNING *", [todo_id, title])
      .then(() => {
        console.log("ADDED TASK");
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  },
  createTodo: async (title) => {
    console.log(title);
    return await db
      .one(`INSERT INTO todos (title) VALUES ($1)`, title)
      .then(() => {
        console.log("ADDED TODO");
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }
};

module.exports = todosController;
