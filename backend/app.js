const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const activityRoutes = require('./routes/activityRoutes');
const conteudoRoutes = require('./routes/conteudoRoutes');

app.use('/users', userRoutes);
app.use('/activities', activityRoutes);
app.use('/conteudos', conteudoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app;
