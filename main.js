const alternativasItens = document.querySelectorAll(".lista-alternativas__item");
const btnProxBandeira = document.querySelector("#btn-prox-bandeira");
const imagemBandeira = document.querySelector("#imagem-bandeira");
const elementoNumeroAcertos = document.querySelector("#numero-acertos");
const elementoNumeroErros = document.querySelector("#numero-erros");
let acertos = 0;
let erros = 0;

alternativasItens.forEach((alternativa) => {
    alternativa.addEventListener("click", () => {
        verificaResposta(alternativa);
    });
});

btnProxBandeira.addEventListener("click", () => {
    btnProxBandeira.style.display = "none";

    alternativasItens.forEach((alternativa) => {
        alternativa.style.pointerEvents = "all";
        alternativa.classList.remove("alternativa-correta");
        alternativa.style.backgroundColor = "";
    });

    geraQuestao();
})

function verificaResposta(e) {
    if (e.classList.contains("alternativa-correta")) {
        acertos++;
        elementoNumeroAcertos.innerHTML = acertos;
    } else {
        erros++;
        elementoNumeroErros.innerHTML = erros;
    }

    alternativasItens.forEach((alternativa) => {
        alternativa.style.pointerEvents = "none";
        alternativa.style.backgroundColor = "#DA2C38";

        if (alternativa.classList.contains("alternativa-correta")) {
            alternativa.style.backgroundColor = "#81B29A";
        }
    });

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
        alternativasItens[numeroAleatorioAlternativa].classList.add("alternativa-correta");

        const alternativaNaoPreenchidas = document.querySelectorAll(".lista-alternativas__item.nao-preenchida");

        if (numeroAleatorioPais === 0) {
            numeroAleatorioPais = numeroAleatorioPais + 2;
        } else if (numeroAleatorioPais === 249) {
            numeroAleatorioPais = numeroAleatorioPais - 2;
        }

        alternativaNaoPreenchidas[0].innerHTML = data[numeroAleatorioPais + 1].name.common;
        alternativaNaoPreenchidas[1].innerHTML = data[numeroAleatorioPais - 1].name.common;

        alternativasItens[numeroAleatorioAlternativa].classList.add("nao-preenchida");
        
    } catch (error) {
        console.error("Algo deu errado!" + error)
    }
}

geraQuestao();