const API_URL = "http://localhost:8080/funcionario/login";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const mensagemErro = document.getElementById("mensagemErro");

    const dadosLogin = {
        nome: nome,
        senha: senha
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
            throw new Error("Nome ou senha incorretos");
        }

        const funcionario = await resposta.json();

        console.log("Login realizado:", funcionario);

    } catch (erro) {

        mensagemErro.textContent = erro.message;
    }
});