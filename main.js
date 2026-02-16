const alternativasItens = document.querySelectorAll(".lista-alternativas__item");
const btnProxBandeira = document.querySelector("#btn-prox-bandeira");

alternativasItens.forEach((alternativa) => {
    alternativa.addEventListener("click", verificaResposta);
});

function verificaResposta() {
    btnProxBandeira.style.display = "block";
};

async function geraQuestao() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,cca3`)

        if(!response.ok) {
            throw new Error("Requisição falhou! " + response.status)
        }

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error("Algo deu errado!" + error)
    }
    
}

geraQuestao();