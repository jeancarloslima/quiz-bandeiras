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
        const response = await fetch(`https://restcountries.com/v3.1/all?fields=name,cca3,flags`);

        if(!response.ok) {
            throw new Error("Requisição falhou! " + response.status)
        }

        const data = await response.json();
        
        let numeroAleatorioPais = Math.floor(Math.random() * 250);
        const numeroAleatorioAlternativa = Math.floor(Math.random() * 3);
        
        imagemBandeira.src = data[numeroAleatorioPais].flags.png;
        imagemBandeira.alt = data[numeroAleatorioPais].flags.alt;
        
        alternativasItens[numeroAleatorioAlternativa].innerHTML = data[numeroAleatorioPais].name.common;
        alternativasItens[numeroAleatorioAlternativa].classList.remove("nao-preenchida");

        const alternativaNaoPreenchidas = document.querySelectorAll(".lista-alternativas__item.nao-preenchida");

        if (numeroAleatorioPais === 0) {
            numeroAleatorioPais = numeroAleatorioPais + 2;
        } else if (numeroAleatorioPais === 249) {
            numeroAleatorioPais = numeroAleatorioPais - 2;
        }

        alternativaNaoPreenchidas[0].innerHTML = data[numeroAleatorioPais + 1].name.common;
        alternativaNaoPreenchidas[1].innerHTML = data[numeroAleatorioPais - 1].name.common;
        
    } catch (error) {
        console.error("Algo deu errado!" + error)
    }
}

geraQuestao();