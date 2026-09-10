const formEstoque = document.getElementById("formEstoque");
const listaMovimentacoes = document.getElementById("listaMovimentacoes");


// ========================================
// CARREGAR MOVIMENTAÇÕES
// ========================================

async function carregarMovimentacoes() {

    try {

        const resposta = await fetch("http://localhost:8080/estoque");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar movimentações.");
        }

        const movimentacoes = await resposta.json();

        listaMovimentacoes.innerHTML = "";

        if (movimentacoes.length === 0) {

            listaMovimentacoes.innerHTML =
                "<p>Nenhuma movimentação registrada.</p>";

            return;
        }

        movimentacoes.forEach(movimentacao => {

            const div = document.createElement("div");

            div.classList.add("movimentacao");

            const tipo = movimentacao.tipoMovimentacao;

            const classeTipo =
                tipo === "ENTRADA"
                    ? "tipo-entrada"
                    : "tipo-saida";

            const textoTipo =
                tipo === "ENTRADA"
                    ? "Entrada"
                    : "Saída";

            const data =
                tipo === "ENTRADA"
                    ? movimentacao.entrada
                    : movimentacao.saida;

            let dataFormatada = "Data não informada";

            if (data) {

                dataFormatada =
                    new Date(data).toLocaleString("pt-BR");
            }

            div.innerHTML = `

                <h3>
                    Movimentação #${movimentacao.id}
                </h3>

                <p>
                    <strong>Equipamento:</strong>
                    ${movimentacao.equipamentosId}
                </p>

                <p>
                    <strong>Funcionário:</strong>
                    ${movimentacao.funcionarioId}
                </p>

                <p>
                    <strong>Tipo:</strong>
                    <span class="${classeTipo}">
                        ${textoTipo}
                    </span>
                </p>

                <p>
                    <strong>Quantidade:</strong>
                    ${movimentacao.numeroLocacoes}
                </p>

                <p>
                    <strong>Data:</strong>
                    ${dataFormatada}
                </p>

            `;

            listaMovimentacoes.appendChild(div);

        });

    } catch (erro) {

        console.error(erro);

        listaMovimentacoes.innerHTML =
            "<p>Não foi possível carregar as movimentações.</p>";
    }
}


// ========================================
// REGISTRAR MOVIMENTAÇÃO
// ========================================

formEstoque.addEventListener("submit", async function (event) {

    event.preventDefault();

    const equipamentosId =
        Number(document.getElementById("equipamentosId").value);

    const funcionarioId =
        Number(document.getElementById("funcionarioId").value);

    const tipoMovimentacao =
        document.getElementById("tipoMovimentacao").value;

    const numeroLocacoes =
        Number(document.getElementById("numeroLocacoes").value);


    // ========================================
    // VALIDAÇÕES
    // ========================================

    if (!equipamentosId) {

        alert("Digite o ID do equipamento.");

        return;
    }

    if (!funcionarioId) {

        alert("Digite o ID do funcionário.");

        return;
    }

    if (!tipoMovimentacao) {

        alert("Selecione o tipo de movimentação.");

        return;
    }

    if (!numeroLocacoes || numeroLocacoes <= 0) {

        alert("Digite uma quantidade válida.");

        return;
    }


    // ========================================
    // OBJETO ENVIADO PARA O BACKEND
    // ========================================

    const movimentacao = {

        equipamentosId: equipamentosId,

        funcionarioId: funcionarioId,

        tipoMovimentacao: tipoMovimentacao,

        numeroLocacoes: numeroLocacoes

    };


    try {

        const resposta = await fetch(
            "http://localhost:8080/estoque",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(movimentacao)
            }
        );


        // ========================================
        // TRATAMENTO DE ERRO
        // ========================================

        if (!resposta.ok) {

            const mensagem =
                await resposta.text();

            throw new Error(
                mensagem || "Erro ao registrar movimentação."
            );
        }


        // ========================================
        // SUCESSO
        // ========================================

        alert("Movimentação registrada com sucesso!");

        formEstoque.reset();

        carregarMovimentacoes();


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível registrar a movimentação.\n\n"
            + erro.message
        );
    }

});


// ========================================
// CARREGAR AO ABRIR A PÁGINA
// ========================================

carregarMovimentacoes();