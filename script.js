const palavrasFacil = ["casa", "bola", "gato", "arroz", "vento"];
const palavrasMedio = ["javascript", "programar", "desenvolvimento", "frontend"];
const palavrasDificil = ["estabelecimento", "inconstitucional", "paralelepipedo"];

const palavraDisplay = document.querySelector(".word");
const inputLetra = document.querySelector("#guess");
const botaoEnviar = document.querySelector("#submit-guess");
const mensagem = document.querySelector(".message");
const tentativasDisplay = document.querySelector("#remaining-attempts");
const seletorDificuldade = document.querySelector("#difficulty");
const inputArea = document.querySelector(".input-area");

let palavraSorteada = "";
let letrasAdivinhadas = [];
let tentativasRestantes = 6;

function gerarPalavraAleatoria() {
    const dificuldade = seletorDificuldade.value; 
    let listaPalavras;

    if (dificuldade === "facil") {
        listaPalavras = palavrasFacil;
        tentativasRestantes = 8; 
    } else if (dificuldade === "dificil") {
        listaPalavras = palavrasDificil;
        tentativasRestantes = 4; 
    } else {
        listaPalavras = palavrasMedio;
        tentativasRestantes = 6; 
    }

    const indice = Math.floor(Math.random() * listaPalavras.length);
    palavraSorteada = listaPalavras[indice];
    inicializarEspacos();
    atualizarTentativas(); 
}

function inicializarEspacos() {
    palavraDisplay.innerHTML = ""; 
    for (let i = 0; i < palavraSorteada.length; i++) {
        const letraSpan = document.createElement("span");
        letraSpan.classList.add("letter");
        letraSpan.textContent = "_";
        palavraDisplay.appendChild(letraSpan);
    }
}

function atualizarTentativas() {
    tentativasDisplay.textContent = tentativasRestantes;
}

function atualizarBoneco() {
    const partesBoneco = [
        ".head",
        ".body",
        ".arm.left",
        ".arm.right",
        ".leg.left",
        ".leg.right"
    ];
    const parteAtual = document.querySelector(partesBoneco[6 - tentativasRestantes]);
    if (parteAtual) {
        parteAtual.style.display = "block";
    }
}

function verificarLetra() {
    const letra = inputLetra.value.toLowerCase(); 
    inputLetra.value = "";

       if (!letra || letra.length !== 1 || !/[a-z]/.test(letra)) {
        mensagem.textContent = "Por favor, insira uma letra válida.";
        return;
    }

    if (letrasAdivinhadas.includes(letra)) {
        mensagem.textContent = `Você já tentou a letra "${letra}".`;
        return;
    }

    letrasAdivinhadas.push(letra);

    if (palavraSorteada.includes(letra)) {
        mensagem.textContent = `Ótimo! A letra "${letra}" está na palavra.`;
        revelarLetras(letra);
    } else {
        mensagem.textContent = `Ops! A letra "${letra}" não está na palavra.`;
        tentativasRestantes--;
        atualizarBoneco();
    }

    verificarFimDeJogo();
}

function revelarLetras(letra) {
    const letrasSpan = document.querySelectorAll(".letter");
    palavraSorteada.split("").forEach((char, index) => {
        if (char === letra) {
            letrasSpan[index].textContent = letra;
        }
    });
}

function verificarFimDeJogo() {
    const letrasSpan = document.querySelectorAll(".letter");
    const palavraAdivinhada = Array.from(letrasSpan).every(span => span.textContent !== "_");

    if (palavraAdivinhada) {
        mensagem.textContent = "Parabéns! Você venceu!";
        botaoEnviar.disabled = true;
    } else if (tentativasRestantes === 0) {
        mensagem.textContent = `Você perdeu! A palavra era "${palavraSorteada}".`;
        botaoEnviar.disabled = true;
    }
}

function iniciarJogo() {
    inputArea.querySelector("select").style.display = "none"; 
    gerarPalavraAleatoria();
    botaoEnviar.disabled = false;
}

seletorDificuldade.addEventListener("change", iniciarJogo);
botaoEnviar.addEventListener("click", verificarLetra);

document.addEventListener("DOMContentLoaded", () => {
    mensagem.textContent = "";
    botaoEnviar.disabled = true;
    inputArea.querySelector("select").style.display = "inline-block";
});
