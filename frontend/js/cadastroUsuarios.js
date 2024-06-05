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
  var userId = document.getElementById("submitBtn").getAttribute("data-user-id");

  if (userId) {
    axios
      .put(`http://localhost:3000/users/${userId}`, {
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha,
      })
      .then(function (response) {
        clearForm();
        console.log("Usuário atualizado com sucesso!");
        $("#successModalAlterado").modal("show");
        updateUserTable();
        document.getElementById("submitBtn").innerText = "Cadastrar Usuário";
        document.getElementById("userForm").reset();
      })
      .catch(function (error) {
        console.error("Erro ao atualizar usuário:", error);
      });
  } else {
    axios
      .post("http://localhost:3000/users", {
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha,
      })
      .then(function (response) {
        clearForm();
        console.log("Cadastro bem-sucedido!");
        $("#successModal").modal("show");
        updateUserTable();
      })
      .catch(function (error) {
        console.error("Erro ao cadastrar usuário:", error);
        if (
          error.response &&
          error.response.status === 422 &&
          error.response.data.error === "E-mail já está em uso"
        ) {
          $("#emailInUseModal").modal("show");
        }
      });
  }
});

$(document).on("click", ".btn-edit", function () {
  var userId = $(this).data("user-id");
  axios
    .get(`http://localhost:3000/users/${userId}`)
    .then(function (response) {
      document.getElementById("nome").value = response.data.nome;
      document.getElementById("telefone").value = response.data.telefone;
      document.getElementById("email").value = response.data.email;
      document.getElementById("senha").value = response.data.senha;

      document.getElementById("submitBtn").innerText = "Salvar Alterações";
      document.getElementById("submitBtn").setAttribute("data-user-id", userId);
    })
    .catch(function (error) {
      console.error("Erro ao obter detalhes do usuário para edição:", error);
    });
});

function updateUserTable() {
  axios
    .get("http://localhost:3000/users")
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
            <button type="button" class="btn btn-sm btn-primary btn-action btn-edit" data-user-id="${user.id}">Editar</button>
            <button type="button" class="btn btn-sm btn-danger btn-action btn-delete" data-user-id="${user.id}">Excluir</button>
          </td>
        `;
      });

      $(document).on("click", ".btn-delete", function () {
        var userId = $(this).data("user-id");
        $("#confirmDeleteModal").modal("show");
        $(".btn-ok").data("user-id", userId);
      });
    })
    .catch(function (error) {
      console.error("Erro ao obter usuários:", error);
    });
}

function deleteUser(userId) {
  axios
    .delete(`http://localhost:3000/users/${userId}`)
    .then(function (response) {
      console.log("Usuário excluído com sucesso!");
      $("#confirmDeleteModal").modal("hide");
      $("#deleteSuccessModal").modal("show");
      updateUserTable();
    })
    .catch(function (error) {
      console.error("Erro ao excluir usuário:", error);
    });
}

$(document).on("click", ".btn-ok", function () {
  var userId = $(this).data("user-id");
  deleteUser(userId);
});

$(document).ready(function () {
  updateUserTable();
});
