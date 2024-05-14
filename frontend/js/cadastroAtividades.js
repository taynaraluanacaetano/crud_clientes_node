document.getElementById("activityForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var question = document.getElementById("question").value;

    axios.post("http://localhost:3000/activities", {
        title: title,
        description: description,
        question: question
    })
        .then(function (response) {
            clearForm();
            document.getElementById("successMessage").classList.remove("d-none");
        })
        .catch(function (error) {
            console.error("Erro ao cadastrar atividade:", error);
        });
});

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("question").value = "";
}