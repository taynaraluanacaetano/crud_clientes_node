$(document).ready(function () {
    function sair() {
        console.log('Saindo da aplicação...');
        window.location.href = 'login.html';
    }

    $('#confirmExitButton').click(function () {
        sair();
    });
});
