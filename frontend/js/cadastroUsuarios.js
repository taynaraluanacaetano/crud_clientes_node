function clearForm() {
    document.getElementById("nome").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("senha").value = "";
}

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    axios.post("http://localhost:3000/users", {
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha
    })
        .then(function (response) {
            clearForm();
            document.getElementById("successMessage").classList.remove("d-none");
            updateUserTable();
        })
        .catch(function (error) {
            console.error("Erro ao cadastrar usuário:", error);
        });
});

function updateUserTable() {
    axios.get("http://localhost:3000/users")
        .then(function (response) {
            var userList = document.getElementById("userList");
            userList.innerHTML = "";

            response.data.forEach(function (user) {
                var newRow = userList.insertRow();
                newRow.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.telefone}</td>
                <td>${user.email}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-primary">Editar</button>
                    <button type="button" class="btn btn-sm btn-danger">Excluir</button>
                </td>
            `;
            });
        })
        .catch(function (error) {
            console.error("Erro ao obter usuários:", error);
        });
}

function formatarTelefone(telefone) {
    var digits = telefone.replace(/\D/g, '');
    return '(' + digits.substring(0, 2) + ') ' + digits.substring(2, 7) + '-' + digits.substring(7, 11);
}

document.getElementById('telefone').addEventListener('input', function (event) {
    var telefone = event.target.value;

    event.target.value = formatarTelefone(telefone);
});

updateUserTable();