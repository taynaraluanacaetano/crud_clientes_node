document.addEventListener("DOMContentLoaded", function () {
    function clearForm() {
      document.getElementById("titulo").value = "";
      document.getElementById("descricao").value = "";
    }
  
    document
      .getElementById("activityForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        var titulo = document.getElementById("titulo").value;
        var descricao = document.getElementById("descricao").value;
        var activityId = document
          .getElementById("submitBtn")
          .getAttribute("data-activity-id");
  
        if (activityId) {
          axios
            .put(`http://localhost:3000/activities/${activityId}`, {
              titulo: titulo,
              descricao: descricao,
            })
            .then(function (response) {
              clearForm();
              console.log("Atividade atualizada com sucesso!");
              $("#successModal").modal("show");
              updateActivityTable();
              document.getElementById("submitBtn").innerText =
                "Cadastrar Atividade";
              document.getElementById("activityForm").reset();
            })
            .catch(function (error) {
              console.error("Erro ao atualizar atividade:", error);
            });
        } else {
          axios
            .post("http://localhost:3000/activities", {
              titulo: titulo,
              descricao: descricao,
            })
            .then(function (response) {
              clearForm();
              console.log("Cadastro bem-sucedido!");
              $("#successModal").modal("show");
              updateActivityTable();
            })
            .catch(function (error) {
              console.error("Erro ao cadastrar atividade:", error);
            });
        }
      });
  
    $(document).on("click", ".btn-edit", function () {
      var activityId = $(this).data("activity-id");
      axios
        .get(`http://localhost:3000/activities/${activityId}`)
        .then(function (response) {
          document.getElementById("titulo").value = response.data.titulo;
          document.getElementById("descricao").value = response.data.descricao;
          document.getElementById("submitBtn").innerText = "Salvar Alterações";
          document
            .getElementById("submitBtn")
            .setAttribute("data-activity-id", activityId);
        })
        .catch(function (error) {
          console.error(
            "Erro ao obter detalhes da atividade para edição:",
            error
          );
        });
    });

    function updateActivityTable() {
      axios
        .get("http://localhost:3000/activities")
        .then(function (response) {
          var activityList = response.data;
          var activityTable = document.getElementById("activiviList");
          activityTable.innerHTML = "";
    
          activityList.forEach(function (activity) {
            var newRow = activityTable.insertRow();
            var formattedDate = "Data não disponível";
    
            if (activity.dataCadastro) {
              var date = new Date(activity.dataCadastro + 'Z');
              formattedDate = date.toLocaleString();
            }
    
            newRow.innerHTML = `
              <td>${activity.titulo}</td>
              <td>${activity.descricao}</td>
              <td>${formattedDate}</td>
              <td>${activity.cadastradoPor ? activity.cadastradoPor : "Indisponível"}</td>
              <td>
                  <button type="button" class="btn btn-sm btn-primary btn-action btn-edit" data-activity-id="${activity.id}">Editar</button>
                  <button type="button" class="btn btn-sm btn-danger btn-action btn-delete" data-activity-id="${activity.id}">Excluir</button>
              </td>
            `;
          });
        })
        .then(function () {
          $(document).on("click", ".btn-delete", function () {
            var activityId = $(this).data("activity-id");
            $("#confirmDeleteModalActivity").modal("show");
            $("#confirmDeleteBtn").data("activity-id", activityId); 
          });
        })
        .catch(function (error) {
          console.error("Erro ao obter atividades:", error);
        });
    }
  
    function deleteActivity(activityId) {
      axios
        .delete(`http://localhost:3000/activities/${activityId}`)
        .then(function (response) {
          console.log("Atividade excluída com sucesso!");
          $("#confirmDeleteModal .modal-body").html(
            "Atividade excluída com sucesso!"
          );
          $("#successModalRemoved").modal("show");
          updateActivityTable(); 
        })
        .catch(function (error) {
          console.error("Erro ao excluir atividade:", error);
        });
    }
  
    $("#successModalRemoved .btn-ok").on("click", function () {
      $("#successModalRemoved").modal("hide");
    });
  
    updateActivityTable();
  
    $(document).on("click", "#confirmDeleteBtn", function () {
      var activityId = $(this).data("activity-id");
      deleteActivity(activityId);
    });
  });
