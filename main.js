const alternativasItens = document.querySelectorAll(".lista-alternativas__item");
const btnProxBandeira = document.querySelector("#btn-prox-bandeira");
const imagemBandeira = document.querySelector("#imagem-bandeira");

alternativasItens.forEach((alternativa) => {
    alternativa.addEventListener("click", verificaResposta);
});

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
        console.log(data[0].flags);

        imagemBandeira.src = data[1].flags.png
        imagemBandeira.alt = data[1].flags.alt
        
    } catch (error) {
        console.error("Algo deu errado!" + error)
    }
}

geraQuestao();