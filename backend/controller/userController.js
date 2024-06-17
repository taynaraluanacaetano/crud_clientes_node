const userService = require('../services/userService');

const validateUserData = (userData) => {
  const { nome, telefone, email, senha } = userData;
  const camposObrigatorios = ["nome", "telefone", "email", "senha"];
  
  const camposFaltando = camposObrigatorios.filter((key) => !userData[key]);
  if (camposFaltando.length > 0) {
    return {
      isValid: false,
      message: `Os seguintes campos são obrigatórios: ${camposFaltando.join(", ")}`
    };
  }

  const chavesExtras = Object.keys(userData).filter(
    (key) => !camposObrigatorios.includes(key)
  );

  if (chavesExtras.length > 0) {
    return {
      isValid: false,
      message: `Campos extras encontrados: ${chavesExtras.join(", ")}`
    };
  }

  return { isValid: true };
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  const validation = validateUserData(userData);

  if (!validation.isValid) {
    return res.status(422).json({ error: validation.message });
  }

  try {
    const createdUser = await userService.createUser(userData);
    res.status(201).json(createdUser);
  } catch (err) {
    if (err.message === "E-mail já está em uso") {
      return res.status(422).json({ error: err.message });
    }
    console.error('Erro ao inserir usuário:', err.message);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
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

exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const validation = validateUserData(userData);

  if (!validation.isValid) {
    return res.status(422).json({ error: validation.message });
  }

  userService.updateUser(userId, userData)
    .then(updatedUser => {
      res.status(201).json(updatedUser);
    })
    .catch(err => {
      if (err.message === "Usuário não encontrado") {
        return res.status(404).json({ error: err.message });
      }
      console.error('Erro ao atualizar usuário:', err.message);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    });
};
