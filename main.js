const alternativasItens = document.querySelectorAll(".lista-alternativas__item");
const btnProxBandeira = document.querySelector("#btn-prox-bandeira");
const imagemBandeira = document.querySelector("#imagem-bandeira");

alternativasItens.forEach((alternativa) => {
    alternativa.addEventListener("click", verificaResposta);
});

btnProxBandeira.addEventListener("click", () => {
    btnProxBandeira.style.display = "none";

    geraQuestao();
})

function verificaResposta() {
    btnProxBandeira.style.display = "block";
};

async function geraQuestao() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,cca3,flags`)

        if(!response.ok) {
            throw new Error("Requisição falhou! " + response.status)
        }

        const data = await response.json();
        
        const numeroAleatorioPais = Math.floor(Math.random() * 251);
        
        imagemBandeira.src = data[numeroAleatorioPais].flags.png
        imagemBandeira.alt = data[numeroAleatorioPais].flags.alt
        
    } catch (error) {
        console.error("Algo deu errado!" + error)
    }
}

geraQuestao();