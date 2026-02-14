const alternativasItens = document.querySelectorAll(".lista-alternativas__item");
const btnProxBandeira = document.querySelector("#btn-prox-bandeira");

alternativasItens.forEach((alternativa) => {
    alternativa.addEventListener("click", verificaResposta);
});

function verificaResposta() {
    btnProxBandeira.style.display = "block";
}