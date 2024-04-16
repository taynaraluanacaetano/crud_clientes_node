const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'frontend')));

const cors = require('cors');
app.use(cors()); 

app.use(express.json());

let users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        nome: req.body.nome,
        telefone: req.body.telefone,
        email: req.body.email,
        senha: req.body.senha
    };
    users.push(newUser);
    res.json({ message: 'Usuário criado com sucesso!' });
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuário não encontrado!' });
    }
});


app.put('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user) {
        Object.assign(user, req.body);
        res.json({ message: 'Usuário atualizado com sucesso!' });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado!' });
    }
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'Usuário excluído com sucesso!' });
    } else {
        res.status(404).json({ message: 'Usuário não encontrado!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
