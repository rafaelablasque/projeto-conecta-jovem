const burguer = document.getElementById("burguer");
const menu = document.getElementById("menu");
const linksMenu = menu.querySelectorAll("a");

function abrirMenu() {
    menu.classList.add("aberto");
    burguer.setAttribute("aria-expanded", "true");
    burguer.setAttribute("aria-label", "Fechar menu");
}

function fecharMenu() {
    menu.classList.remove("aberto");
    burguer.setAttribute("aria-expanded", "false");
    burguer.setAttribute("aria-label", "Abrir menu");
}

burguer.addEventListener("click", function () {
    if (menu.classList.contains("aberto")) {
        fecharMenu();
    } else {
        abrirMenu();
    }
});

document.addEventListener("click", function (evento) {
    if (!burguer.contains(evento.target) && !menu.contains(evento.target)) {
        fecharMenu();
    }
});

linksMenu.forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

const galeria = document.getElementById("galeria");

if (galeria) {
    const botoes = document.querySelectorAll(".filtros__botao");
    const fotos = document.querySelectorAll(".miniatura");
    const total = document.getElementById("contador");

    const modal = document.getElementById("modal");
    const btnFechar = document.getElementById("fechar");
    const btnAnterior = document.getElementById("anterior");
    const btnProximo = document.getElementById("proxima");
    const imagemModal = document.getElementById("modal-imagem");
    const tituloModal = document.getElementById("modal-titulo");
    const descricaoModal = document.getElementById("modal-descricao");
    const posicaoModal = document.getElementById("modal-posicao");

    let fotosVisiveis = [];
    let indiceAtual = 0;
    let fotoOrigem = null;   
    let posicaoRolagem = 0;  

    function atualizarVisiveis() {
        fotosVisiveis = [];

        fotos.forEach(function (foto) {
            if (!foto.classList.contains("oculta")) {
                fotosVisiveis.push(foto);
            }
        });

        total.textContent = fotosVisiveis.length + " de " + fotos.length + " imagens exibidas";
    }

    function filtrarImagens(categoria) {
        fotos.forEach(function (foto) {
            if (categoria === "Todas" || foto.dataset.categoria === categoria) {
                foto.classList.remove("oculta");
            } else {
                foto.classList.add("oculta");
            }
        });

        if (categoria === "Todas") {
            galeria.classList.remove("miniatura-filtrado");
        } else {
            galeria.classList.add("miniatura-filtrado");
        }

        atualizarVisiveis();
    }

    botoes.forEach(function (botao) {
        botao.addEventListener("click", function () {
            botoes.forEach(function (item) {
                item.classList.remove("ativo");
            });
            botao.classList.add("ativo");

            filtrarImagens(botao.dataset.filtro);
        });
    });

    function mostrarFoto(indice) {
        const quantidade = fotosVisiveis.length;

        indiceAtual = (indice + quantidade) % quantidade;

        const foto = fotosVisiveis[indiceAtual];

        imagemModal.src = foto.src;
        imagemModal.alt = foto.alt;
        tituloModal.textContent = foto.dataset.titulo;
        descricaoModal.textContent = foto.dataset.descricao;
        posicaoModal.textContent = (indiceAtual + 1) + " de " + quantidade;
    }

    function manterPosicao() {
        window.scrollTo(0, posicaoRolagem);
    }

    function abrirModal(foto) {
        fotoOrigem = foto;
        indiceAtual = fotosVisiveis.indexOf(foto);
        mostrarFoto(indiceAtual);

        modal.classList.add("aberto");
        modal.setAttribute("aria-hidden", "false");

        posicaoRolagem = window.scrollY;
        window.addEventListener("scroll", manterPosicao);

        btnFechar.focus();
    }

    function fecharModal() {
        modal.classList.remove("aberto");
        modal.setAttribute("aria-hidden", "true");

        window.removeEventListener("scroll", manterPosicao);

        fotoOrigem.focus();
    }

    fotos.forEach(function (foto) {
        foto.addEventListener("click", function () {
            abrirModal(foto);
        });

        foto.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrirModal(foto);
            }
        });
    });

    btnFechar.addEventListener("click", fecharModal);

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            fecharModal();
        }
    });

    btnProximo.addEventListener("click", function () {
        mostrarFoto(indiceAtual + 1);
    });

    btnAnterior.addEventListener("click", function () {
        mostrarFoto(indiceAtual - 1);
    });

    document.addEventListener("keydown", function (evento) {
        if (!modal.classList.contains("aberto")) {
            return;
        }

        if (evento.key === "Escape") {
            fecharModal();
        }
        if (evento.key === "ArrowRight") {
            mostrarFoto(indiceAtual + 1);
        }
        if (evento.key === "ArrowLeft") {
            mostrarFoto(indiceAtual - 1);
        }
    });

    filtrarImagens("Todas");
}