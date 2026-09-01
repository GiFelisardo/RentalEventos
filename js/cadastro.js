const API_URL = "http://localhost:8080/equipamentos";

const form = document.getElementById("formEquipamento");
const listaEquipamentos = document.getElementById("listaEquipamentos");
const listaAlertas = document.getElementById("listaAlertas");


// ============================================
// CADASTRAR EQUIPAMENTO
// ============================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const equipamento = {

        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        categoria: document.getElementById("categoria").value,
        potencia: document.getElementById("potencia").value,
        material: document.getElementById("material").value,
        peso: document.getElementById("peso").value,
        dimensoes: document.getElementById("dimensoes").value,
        cor: document.getElementById("cor").value,

        quantidadeDisponivel:
            Number(document.getElementById("quantidadeDisponivel").value),

        quantidadeMinima:
            Number(document.getElementById("quantidadeMinima").value)
    };


    try {

        const resposta = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(equipamento)
        });


        if (!resposta.ok) {

            throw new Error(
                "Erro ao cadastrar equipamento. Status: "
                + resposta.status
            );

        }


        const equipamentoCadastrado = await resposta.json();

        console.log("Equipamento cadastrado:", equipamentoCadastrado);


        alert("Equipamento cadastrado com sucesso!");


        // Limpa os campos
        form.reset();


        // Atualiza a lista
        carregarEquipamentos();

    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível cadastrar o equipamento.");

    }

});


// ============================================
// LISTAR EQUIPAMENTOS
// ============================================

async function carregarEquipamentos() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar equipamentos. Status: "
                + resposta.status
            );

        }

        const equipamentos = await resposta.json();

        mostrarEquipamentos(equipamentos);
        mostrarAlertas(equipamentos);

    } catch (erro) {

        console.error("Erro ao carregar equipamentos:", erro);

    }

}


// ============================================
// MOSTRAR EQUIPAMENTOS NA TELA
// ============================================

function mostrarEquipamentos(equipamentos) {

    listaEquipamentos.innerHTML = "";


    if (equipamentos.length === 0) {

        listaEquipamentos.innerHTML =
            "<p>Nenhum equipamento cadastrado.</p>";

        return;
    }


    equipamentos.forEach(function (equipamento) {

        const card = document.createElement("div");

        card.classList.add("equipamento");


        const estoqueSuficiente =
            equipamento.quantidadeDisponivel >=
            equipamento.quantidadeMinima;


        card.innerHTML = `

            <h3>
                ${equipamento.marca} ${equipamento.modelo}
            </h3>

            <p>
                <strong>ID:</strong>
                ${equipamento.id}
            </p>

            <p>
                <strong>Categoria:</strong>
                ${equipamento.categoria}
            </p>

            <p>
                <strong>Marca:</strong>
                ${equipamento.marca}
            </p>

            <p>
                <strong>Modelo:</strong>
                ${equipamento.modelo}
            </p>

            <p>
                <strong>Quantidade disponível:</strong>
                ${equipamento.quantidadeDisponivel}
            </p>

            <p class="estoque ${
                estoqueSuficiente
                    ? "suficiente"
                    : "insuficiente"
            }">

                ${
                    estoqueSuficiente
                        ? "● Estoque suficiente"
                        : "⚠ Estoque baixo"
                }

            </p>

            <div class="acoes-equipamento">

                <button
                    type="button"
                    class="btn-editar"
                    onclick="editarEquipamento(${equipamento.id})">

                    Editar

                </button>


                <button
                    type="button"
                    class="btn-excluir"
                    onclick="excluirEquipamento(${equipamento.id})">

                    Excluir

                </button>

            </div>

        `;


        listaEquipamentos.appendChild(card);

    });

}


// ============================================
// ALERTAS
// ============================================

function mostrarAlertas(equipamentos) {

    listaAlertas.innerHTML = "";


    const equipamentosEmAlerta = equipamentos.filter(
        equipamento =>
            equipamento.quantidadeDisponivel <
            equipamento.quantidadeMinima
    );


    if (equipamentosEmAlerta.length === 0) {

        listaAlertas.innerHTML =
            "<p>Nenhum equipamento precisa de reposição.</p>";

        return;
    }


    equipamentosEmAlerta.forEach(function (equipamento) {

        const alerta = document.createElement("div");

        alerta.classList.add("alerta");


        alerta.innerHTML = `

            <strong>
                ${equipamento.marca} ${equipamento.modelo}
            </strong>

            <p>
                Disponível:
                ${equipamento.quantidadeDisponivel}
            </p>

            <p>
                Mínimo:
                ${equipamento.quantidadeMinima}
            </p>

        `;


        listaAlertas.appendChild(alerta);

    });

}


// ============================================
// EXCLUIR
// ============================================

async function excluirEquipamento(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este equipamento?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const resposta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao excluir equipamento."
            );

        }


        alert("Equipamento excluído com sucesso!");


        carregarEquipamentos();


    } catch (erro) {

        console.error(erro);

        alert("Não foi possível excluir o equipamento.");

    }

}


// ============================================
// EDITAR
// ============================================

function editarEquipamento(id) {

    alert(
        "A função de edição será implementada na próxima etapa."
    );

}


// ============================================
// INICIALIZAÇÃO
// ============================================

carregarEquipamentos();