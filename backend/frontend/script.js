
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


loadUsers();
