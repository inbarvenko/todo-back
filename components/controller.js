const db = require('../db/connection.js');

const todosController = {
  getAllTodoTasks: async (todosid) => {
    return await db
      .any("SELECT * FROM tasks WHERE todosid = ($1)", todosid)
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
      .then((data) => {
        console.log("ADDED TASK");
        return data;
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  },
  createTodo: async (title) => {
    return await db
      .one(`INSERT INTO todos (title) VALUES ($1) RETURNING *`, title)
      .then((data) => {
        console.log("ADDED TODO");
        return data;
      })
      .catch((error) => {
        console.log("ERROR:", error);
        return false;
      });
  },
  removeTodo: async (todo_id) => {
    return await db
      .none(`DELETE FROM todos WHERE id = ($1)`, todo_id)
      .then(() => {
        console.log("DELETED TODO");
        return true;
      })
      .catch((error) => {
        console.log("ERROR:", error);
        return false;
      });
  },
  removeTask: async (task_id) => {
    return await db
      .none(`DELETE FROM tasks WHERE id = ($1)`, task_id)
      .then(() => {
        console.log("DELETED TASK");
        return true;
      })
      .catch((error) => {
        console.log("ERROR:", error);
        return false;
      });
  },
  toggleStatus: async (status, task_id) => {
    return await db
      .none(`UPDATE tasks SET active = ($1) WHERE id = ($2)`, [status, task_id])
      .then(() => {
        console.log("TOGGLED STATUS");
        return true;
      })
      .catch((error) => {
        console.log("ERROR:", error);
        return false;
      });
  },
  changeTitleTodo: async (todosid, title) => {

    console.log(title);
    return await db
      .none(`UPDATE todos SET title = ($1) WHERE id = ($2)`, [title, todosid])
      .then(() => {
        console.log("CHANGED TITLE TODO");
        return true;
      })
      .catch((error) => {
        console.log("ERROR:", error);
        return false;
      });
  },
  changeTitleTask: async (taskid, title) => {
    return await db
      .none(`UPDATE tasks SET title = ($1) WHERE id = ($2)`, [title, taskid])
      .then(() => {
        console.log("CHANGED TITLE TASK");
        return true;
      })
      .catch((error) => {
        console.log("ERROR:", error);
        return false;
      });
  }
};

module.exports = todosController;
