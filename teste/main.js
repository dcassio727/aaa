
// ========================================
// CARRINHO
// ========================================

// Recupera o carrinho salvo no navegador
let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];


// ========================================
// SALVAR CARRINHO
// ========================================

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}


// ========================================
// ADICIONAR PRODUTO
// ========================================

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );


    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    // Salva novamente para garantir que
    // qualquer alteração fique registrada
    salvarCarrinho();


    const container =
        document.getElementById("itensCarrinho");

    const totalElemento =
        document.getElementById("total");

    const quantidadeTopo =
        document.getElementById("quantidadeTopo");


    // Se estiver em uma página que não possui
    // esses elementos, simplesmente não faz nada
    if (!container) {
        atualizarQuantidadeTopo();
        return;
    }


    container.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    // Carrinho vazio

    if (carrinho.length === 0) {

        container.innerHTML = `
            <div class="carrinho-vazio">
                Seu carrinho está vazio.
                <br><br>
                Adicione algum produto! 🍔
            </div>
        `;

    }


    // Produtos

    carrinho.forEach((produto, index) => {

        const subtotal =
            produto.preco * produto.quantidade;


        total += subtotal;

        quantidadeTotal += produto.quantidade;


        container.innerHTML += `

            <div class="item-carrinho">

                <div class="item-cima">

                    <span class="item-nome">
                        ${produto.nome}
                    </span>

                    <span class="item-preco">
                        R$ ${formatarPreco(subtotal)}
                    </span>

                </div>


                <div class="controles">

                    <button
                        onclick="diminuirQuantidade(${index})">
                        −
                    </button>

                    <span class="quantidade">
                        ${produto.quantidade}
                    </span>

                    <button
                        onclick="aumentarQuantidade(${index})">
                        +
                    </button>

                    <button
                        class="remover"
                        onclick="removerProduto(${index})">
                        🗑️
                    </button>

                </div>

            </div>

        `;

    });


    if (totalElemento) {

        totalElemento.textContent =
            formatarPreco(total);

    }


    if (quantidadeTopo) {

        quantidadeTopo.textContent =
            quantidadeTotal;

    }

}


// ========================================
// ATUALIZAR QUANTIDADE DO TOPO
// ========================================

function atualizarQuantidadeTopo() {

    const quantidadeTopo =
        document.getElementById("quantidadeTopo");


    if (!quantidadeTopo) {
        return;
    }


    const quantidadeTotal =
        carrinho.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );


    quantidadeTopo.textContent =
        quantidadeTotal;

}


// ========================================
// FORMATAR PREÇO
// ========================================

function formatarPreco(valor) {

    return valor
        .toFixed(2)
        .replace(".", ",");

}


// ========================================
// AUMENTAR QUANTIDADE
// ========================================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    salvarCarrinho();

    atualizarCarrinho();

}


// ========================================
// DIMINUIR QUANTIDADE
// ========================================

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;


    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }


    salvarCarrinho();

    atualizarCarrinho();

}


// ========================================
// REMOVER PRODUTO
// ========================================

function removerProduto(index) {

    carrinho.splice(index, 1);

    salvarCarrinho();

    atualizarCarrinho();

}


// ========================================
// ABRIR CARRINHO
// ========================================

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    const fundo =
        document.getElementById("fundoCarrinho");


    if (carrinhoElemento) {

        carrinhoElemento.classList.add("aberto");

    }


    if (fundo) {

        fundo.classList.add("aberto");

    }

}


// ========================================
// FECHAR CARRINHO
// ========================================

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    const fundo =
        document.getElementById("fundoCarrinho");


    if (carrinhoElemento) {

        carrinhoElemento.classList.remove("aberto");

    }


    if (fundo) {

        fundo.classList.remove("aberto");

    }

}


// ========================================
// FINALIZAR PEDIDO
// ========================================

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }


    let mensagem =
        "Olá! Gostaria de fazer um pedido:%0A%0A";


    let total = 0;


    carrinho.forEach(produto => {

        const subtotal =
            produto.preco * produto.quantidade;


        total += subtotal;


        mensagem +=
            `${produto.nome} x${produto.quantidade} - R$ ${formatarPreco(subtotal)}%0A`;

    });


    mensagem +=
        `%0ATotal: R$ ${formatarPreco(total)}`;


    // COLOQUE SEU NÚMERO AQUI
    const numero =
        "5511999999999";


    window.open(
        `https://wa.me/${numero}?text=${mensagem}`,
        "_blank"
    );

}


// ========================================
// FILTRAR CATEGORIA
// ========================================

function filtrarCategoria(categoria, botao) {

    const produtos =
        document.querySelectorAll(".produto");


    document
        .querySelectorAll(".categoria")
        .forEach(item => {

            item.classList.remove("ativa");

        });


    if (botao) {

        botao.classList.add("ativa");

    }


    produtos.forEach(produto => {

        if (
            categoria === "todos" ||
            produto.dataset.categoria === categoria
        ) {

            produto.style.display = "flex";

        } else {

            produto.style.display = "none";

        }

    });

}


// ========================================
// PESQUISA
// ========================================

function pesquisarProdutos() {

    const campo =
        document.getElementById("pesquisa");


    if (!campo) {
        return;
    }


    const texto =
        campo.value.toLowerCase();


    document
        .querySelectorAll(".produto")
        .forEach(produto => {

            const nome =
                produto
                .querySelector("h3")
                .textContent
                .toLowerCase();


            if (nome.includes(texto)) {

                produto.style.display = "flex";

            } else {

                produto.style.display = "none";

            }

        });

}


// ========================================
// AO ABRIR QUALQUER PÁGINA
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarCarrinho();

        atualizarQuantidadeTopo();

    }
);
