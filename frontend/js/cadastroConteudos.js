function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("inputGroupSelect02").value = "";
  document.getElementById("content").value = "";
}

document
  .getElementById("contentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var tipoConteudo = document.getElementById("inputGroupSelect02").value;
    var content = document.getElementById("content").value;

    axios
      .post("http://localhost:3000/conteudos", {
        titulo: title,
        descricao: description,
        tipoConteudo: tipoConteudo,
        conteudo: content,
      })
      .then(function (response) {
        clearForm();
        console.log("Conteúdo cadastrado com sucesso!");
        $("#successModal").modal("show");
        updateConteudoTable();
      })
      .catch(function (error) {
        console.error("Erro ao cadastrar conteúdo:", error);
      });
  });

$(document).on("click", ".btn-edit", function () {
  var contentId = $(this).data("content-id");
  axios
    .get(`http://localhost:3000/conteudos/${contentId}`)
    .then(function (response) {
      document.getElementById("title").value = response.data.titulo;
      document.getElementById("description").value = response.data.descricao;
      document.getElementById("inputGroupSelect02").value =
        response.data.tipoConteudo;
      document.getElementById("content").value = response.data.conteudo;

      document.getElementById("submitBtn").innerText = "Salvar Alterações";
      document
        .getElementById("submitBtn")
        .setAttribute("data-content-id", contentId);
    })
    .catch(function (error) {
      console.error("Erro ao obter detalhes do conteúdo para edição:", error);
    });
});

function updateConteudoTable() {
  axios
    .get("http://localhost:3000/conteudos")
    .then(function (response) {
      var conteudoList = document.getElementById("conteudoList");
      conteudoList.innerHTML = "";

      response.data.forEach(function (conteudo) {
        var newRow = conteudoList.insertRow();

        newRow.innerHTML = `
            <td>${conteudo.titulo}</td>
            <td>${conteudo.descricao}</td>
            <td>${conteudo.tipoConteudo}</td>
            <td>${conteudo.conteudo}</td>
            <td>${conteudo.dataCadastro}</td>
            <td>${conteudo.cadastradoPor ? conteudo.cadastradoPor : "Indisponível"}</td>
            <td>
              <button type="button" class="btn btn-sm btn-primary btn-action btn-edit" data-content-id="${conteudo.id}">Editar</button>
              <button type="button" class="btn btn-sm btn-danger btn-action btn-delete" data-content-id="${conteudo.id}">Excluir</button>
            </td>
          `;
      });

      $(document).on("click", ".btn-delete", function () {
        var contentId = $(this).data("content-id");
        $("#confirmDeleteModal").modal("show");
        $(".btn-ok").data("content-id", contentId);
      });
    })
    .catch(function (error) {
      console.error("Erro ao obter conteúdos:", error);
    });
}

function deleteConteudo(contentId) {
  axios
    .delete(`http://localhost:3000/conteudos/${contentId}`)
    .then(function (response) {
      console.log("Conteúdo excluído com sucesso!");
      $("#confirmDeleteModal").modal("hide");

      $("#successModalRemoved").modal("show");
      updateConteudoTable(); 
    })
    .catch(function (error) {
      console.error("Erro ao excluir conteúdo!:", error);
    });
}

$("#successModalRemoved .btn-ok").on("click", function () {
  $("#successModalRemoved").modal("hide");
});

updateConteudoTable();

$(document).on("click", "#confirmDeleteBtn", function () {
  var contentId = $(this).data("conteudo-id");
  deleteConteudo(contentId);

});