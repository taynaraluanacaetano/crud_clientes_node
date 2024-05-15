const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    window.location.href = 'menuPrincipal.html'; // Redirecionamento para a página principal
  } else {
    $("#loginErrorModal").modal("show");
  }
});

