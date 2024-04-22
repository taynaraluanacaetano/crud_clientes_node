
const loadUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/users');
        const users = response.data;
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Nome:</strong> ${user.nome}</p>
                <p><strong>Telefone:</strong> ${user.telefone}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <hr>
            `;
            userList.appendChild(userItem);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
};

const searchUsers = async () => {
    const searchValue = document.getElementById('searchInput').value.trim();
    if (searchValue === '') {
        loadUsers();
        return;
    }
    try {
        const response = await axios.get(`http://localhost:3000/users?nome_like=${searchValue}`);
        const users = response.data;
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Nome:</strong> ${user.nome}</p>
                <p><strong>Telefone:</strong> ${user.telefone}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <hr>
            `;
            userList.appendChild(userItem);
        });
    } catch (error) {
        console.error('Erro ao pesquisar usuários:', error);
    }
};


document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        await axios.post('http://localhost:3000/users', {
            nome,
            telefone,
            email,
            senha
        });
        loadUsers();
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
    }
});

// Função para excluir um usuário
const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      console.log('Usuário excluído com sucesso');
      loadUsers(); // Recarregar a lista de usuários após a exclusão
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };
  
  // Adicionar um event listener para o botão de exclusão
  document.getElementById('userList').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-user-btn')) {
      const userId = event.target.dataset.userId;
      await deleteUser(userId);
    }
  });
  


loadUsers();
