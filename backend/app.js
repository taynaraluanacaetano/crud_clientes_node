const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

const userController = require("../backend/controllers/userController");

app.get("/users", userController.getAllUsers);
app.post("/users", userController.createUser);
app.delete('/users/:id', userController.deleteUser);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
