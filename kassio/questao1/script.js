// Seleciona os elementos HTML que vamos manipular
const counterDisplay = document.getElementById('counter-display');
const clickButton = document.getElementById('click-button');

// Inicializa a variável do contador
let count = 0;

// Adiciona um "ouvinte" de evento de clique ao botão
clickButton.addEventListener('click', () => {
    // Aumenta o contador em 1
    count++;
    
    // Atualiza o texto do elemento de exibição com o novo valor
    counterDisplay.textContent = count;
});