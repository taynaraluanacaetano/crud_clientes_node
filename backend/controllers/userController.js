const userService = require('../services/userService');

exports.getAllUsers = (req, res) => {
  userService.getAllUsers()
    .then(users => res.json(users))
    .catch(err => {
      console.error('Erro ao carregar usuários:', err.message);
      res.status(500).json({ error: 'Erro ao carregar usuários' });
    });
};

exports.createUser = (req, res) => {
  const userData = req.body;
  userService.createUser(userData)
    .then(() => res.status(201).json({ message: 'Usuário criado com sucesso' }))
    .catch(err => {
      console.error('Erro ao inserir usuário:', err.message);
      res.status(500).json({ error: 'Erro ao inserir usuário' });
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  userService.deleteUser(userId)
    .then(() => res.json({ message: 'Usuário excluído com sucesso' }))
    .catch(err => {
      console.error('Erro ao excluir usuário:', err.message);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    });
};
