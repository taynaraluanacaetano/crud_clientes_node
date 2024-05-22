const userService = require('../services/userService');

exports.createUser = (req, res) => {
  const userData = req.body;
  userService.createUser(userData)
    .then(createdUser => {
      const { senha, ...userWithoutPassword } = createdUser.toObject(); // .toObject() garante que estamos lidando com um objeto simples
      res.status(201).json(userWithoutPassword); // Certifique-se de não incluir a senha na resposta
    })
    .catch(err => {
      console.error('Erro ao inserir usuário:', err.message);
      res.status(500).json({ error: 'Erro ao inserir usuário' });
    });
};

exports.getAllUsers = (req, res) => {
  userService.getAllUsers()
    .then(users => {
      const usersWithoutPasswords = users.map(user => {
        const { senha, ...userWithoutPassword } = user.toObject();
        console.log(userWithoutPassword); // Log para verificação
        return userWithoutPassword;
      });
      res.status(200).json(usersWithoutPasswords);
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
      res.status(204).end();
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
      const { senha, ...userWithoutPassword } = user.toObject(); // .toObject() para remover a senha
      res.status(200).json(userWithoutPassword); // Certifique-se de não incluir a senha na resposta
    })
    .catch(err => {
      console.error("Erro ao obter dados do usuário:", err.message);
      res.status(500).json({ error: "Erro ao obter dados do usuário" });
    });
};

