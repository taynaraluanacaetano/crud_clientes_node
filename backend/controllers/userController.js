const userService = require('../services/userService');

exports.createUser = (req, res) => {
  const userData = req.body;
  userService.createUser(userData)
    .then(createdUser => {
      const responseBody = { ...req.body, ...createdUser }; // Combina o corpo da requisição com os dados do usuário criado
      res.status(201).json(responseBody); // Retorna o corpo completo da requisição junto com os dados do usuário criado
    })
    .catch(err => {
      console.error('Erro ao inserir usuário:', err.message);
      res.status(500).json({ error: 'Erro ao inserir usuário' });
    });
};

exports.getAllUsers = (req, res) => {
  userService.getAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error('Erro ao buscar usuários:', err.message);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  userService.deleteUser(userId)
    .then(() => {
      res.status(204).end(); // Resposta de sucesso sem conteúdo
    })
    .catch(err => {
      console.error('Erro ao excluir usuário:', err.message);
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id; 
  userService.getUserById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    })
    .catch(err => {
      console.error("Erro ao obter dados do usuário:", err.message);
      res.status(500).json({ error: "Erro ao obter dados do usuário" });
    });
};
