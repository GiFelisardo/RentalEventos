const API_URL = "http://localhost:8080/equipamentos";

const form = document.getElementById("formEquipamento");
const listaEquipamentos = document.getElementById("listaEquipamentos");
const listaAlertas = document.getElementById("listaAlertas");

const btnFiltros = document.getElementById("btnFiltros");
const filtros = document.getElementById("filtros");

btnFiltros.addEventListener("click", function () {

    filtros.classList.toggle("ativo");

});

const btnAplicarFiltros =
    document.getElementById("aplicarFiltros");

btnAplicarFiltros.addEventListener("click", function () {

    aplicarFiltros();

});

let equipamentosCadastrados = [];
let todosEquipamentos = [];
let equipamentoEditandoId = null;


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

        // ============================================
        // EDITAR
        // ============================================

        if (equipamentoEditandoId !== null) {

            const resposta = await fetch(
                `${API_URL}/${equipamentoEditandoId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(equipamento)
                }
            );


            if (!resposta.ok) {

                throw new Error(
                    "Erro ao editar equipamento. Status: "
                    + resposta.status
                );

            }


            const equipamentoEditado = await resposta.json();

            console.log(
                "Equipamento editado:",
                equipamentoEditado
            );


            alert("Equipamento editado com sucesso!");


            // Volta para o modo cadastro
            equipamentoEditandoId = null;

            form.reset();


            // Volta o texto do botão
            document.getElementById("btnCadastrar").textContent =
                "Cadastrar equipamento";


            carregarEquipamentos();

            return;
        }


        // ============================================
        // CADASTRAR
        // ============================================

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

        console.log(
            "Equipamento cadastrado:",
            equipamentoCadastrado
        );


        alert("Equipamento cadastrado com sucesso!");


        form.reset();


        carregarEquipamentos();


    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível cadastrar/editar o equipamento.");

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

        equipamentosCadastrados = equipamentos;
        todosEquipamentos = equipamentos;

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

async function editarEquipamento(id) {

    try {

        const resposta = await fetch(`${API_URL}/${id}`);


        if (!resposta.ok) {

            throw new Error(
                "Não foi possível buscar o equipamento."
            );

        }


        const equipamento = await resposta.json();


        // Guarda o ID do equipamento que será editado
        equipamentoEditandoId = id;


        // Preenche o formulário
        document.getElementById("marca").value =
            equipamento.marca;

        document.getElementById("modelo").value =
            equipamento.modelo;

        document.getElementById("categoria").value =
            equipamento.categoria;

        document.getElementById("potencia").value =
            equipamento.potencia;

        document.getElementById("material").value =
            equipamento.material;

        document.getElementById("peso").value =
            equipamento.peso;

        document.getElementById("dimensoes").value =
            equipamento.dimensoes;

        document.getElementById("cor").value =
            equipamento.cor;

        document.getElementById("quantidadeDisponivel").value =
            equipamento.quantidadeDisponivel;

        document.getElementById("quantidadeMinima").value =
            equipamento.quantidadeMinima;


        // Muda o texto do botão
        document.getElementById("btnCadastrar").textContent =
            "Salvar alterações";


        // Rola a página até o formulário
        document.querySelector(".cadastro").scrollIntoView({
            behavior: "smooth"
        });


    } catch (erro) {

        console.error("Erro ao editar:", erro);

        alert("Não foi possível carregar o equipamento para edição.");

    }

}

// ============================================
// PESQUISA
// ============================================

const campoPesquisa = document.getElementById("pesquisa");

campoPesquisa.addEventListener("input", function () {

    const texto = campoPesquisa.value.toLowerCase().trim();

    const resultados = equipamentosCadastrados.filter(function (equipamento) {

        return (
            equipamento.marca.toLowerCase().includes(texto) ||
            equipamento.modelo.toLowerCase().includes(texto) ||
            equipamento.categoria.toLowerCase().includes(texto) ||
            equipamento.potencia.toLowerCase().includes(texto) ||
            equipamento.material.toLowerCase().includes(texto) ||
            equipamento.peso.toLowerCase().includes(texto) ||
            equipamento.dimensoes.toLowerCase().includes(texto) ||
            equipamento.cor.toLowerCase().includes(texto)
        );

    });

    mostrarEquipamentos(resultados);

});

// ============================================
// FILTROS
// ============================================

const camposFiltro = [
    "marcaFiltro",
    "modeloFiltro",
    "categoriaFiltro",
    "potenciaFiltro",
    "materialFiltro",
    "pesoFiltro",
    "dimensoesFiltro",
    "corFiltro",
    "quantidadeFiltro"
];

// ============================================
// APLICAR FILTROS
// ============================================

function aplicarFiltros() {

    const marca = document
        .getElementById("marcaFiltro")
        .value
        .toLowerCase()
        .trim();

    const modelo = document
        .getElementById("modeloFiltro")
        .value
        .toLowerCase()
        .trim();

    const categoria = document
        .getElementById("categoriaFiltro")
        .value
        .toLowerCase()
        .trim();

    const potencia = document
        .getElementById("potenciaFiltro")
        .value
        .toLowerCase()
        .trim();

    const material = document
        .getElementById("materialFiltro")
        .value
        .toLowerCase()
        .trim();

    const peso = document
        .getElementById("pesoFiltro")
        .value
        .toLowerCase()
        .trim();

    const dimensoes = document
        .getElementById("dimensoesFiltro")
        .value
        .toLowerCase()
        .trim();

    const cor = document
        .getElementById("corFiltro")
        .value
        .toLowerCase()
        .trim();

    const quantidade = document
        .getElementById("quantidadeFiltro")
        .value
        .trim();


    const equipamentosFiltrados = todosEquipamentos.filter(
        function (equipamento) {

            const correspondeMarca =
                !marca ||
                equipamento.marca
                    .toLowerCase()
                    .includes(marca);


            const correspondeModelo =
                !modelo ||
                equipamento.modelo
                    .toLowerCase()
                    .includes(modelo);


            const correspondeCategoria =
                !categoria ||
                equipamento.categoria
                    .toLowerCase() === categoria;


            const correspondePotencia =
                !potencia ||
                equipamento.potencia
                    .toLowerCase()
                    .includes(potencia);


            const correspondeMaterial =
                !material ||
                equipamento.material
                    .toLowerCase()
                    .includes(material);


            const correspondePeso =
                !peso ||
                equipamento.peso
                    .toLowerCase()
                    .includes(peso);


            const correspondeDimensoes =
                !dimensoes ||
                equipamento.dimensoes
                    .toLowerCase()
                    .includes(dimensoes);


            const correspondeCor =
                !cor ||
                equipamento.cor
                    .toLowerCase()
                    .includes(cor);


            const correspondeQuantidade =
                !quantidade ||
                equipamento.quantidadeDisponivel ==
                Number(quantidade);


            return (
                correspondeMarca &&
                correspondeModelo &&
                correspondeCategoria &&
                correspondePotencia &&
                correspondeMaterial &&
                correspondePeso &&
                correspondeDimensoes &&
                correspondeCor &&
                correspondeQuantidade
            );

        }
    );


    mostrarEquipamentos(equipamentosFiltrados);

}

// ============================================
// LIMPAR FILTROS
// ============================================

document
    .getElementById("limparFiltros")
    .addEventListener("click", function () {

        document.getElementById("marcaFiltro").value = "";
        document.getElementById("modeloFiltro").value = "";
        document.getElementById("categoriaFiltro").value = "";
        document.getElementById("potenciaFiltro").value = "";
        document.getElementById("materialFiltro").value = "";
        document.getElementById("pesoFiltro").value = "";
        document.getElementById("dimensoesFiltro").value = "";
        document.getElementById("corFiltro").value = "";
        document.getElementById("quantidadeFiltro").value = "";

        mostrarEquipamentos(todosEquipamentos);

    });

// ============================================
// MENU
// ============================================

const btnMenu = document.getElementById("btnMenu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", function () {

    menu.classList.toggle("ativo");

});

carregarEquipamentos();