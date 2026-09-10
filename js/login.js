const API_URL = "http://localhost:8080/funcionario/login";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const setor = document.getElementById("setor").value;
    const mensagemErro = document.getElementById("mensagemErro");

    mensagemErro.textContent = "";

    const dadosLogin = {
        nome: nome,
        senha: senha,
        setor: setor
    };

    try {

        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosLogin)
        });

        if (!resposta.ok) {

            const mensagem = await resposta.text();

            throw new Error(
                mensagem || "Falha na autenticação."
            );
        }

        const funcionario = await resposta.json();

        console.log("Login realizado:", funcionario);

        // Redireciona após o login
        window.location.href = "cadastro.html";

    } catch (erro) {

        mensagemErro.textContent = erro.message;
    }
});