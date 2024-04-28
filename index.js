require('dotenv').config();
const express = require("express");
const cors = require('cors');

const app = express();

const todosModule = require("./components/routers");

app.use(express.json());

app.use(cors());

app.use("/todos", todosModule);

app.get('*', (req, res) => {
  res.sendStatus(404);
});


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});