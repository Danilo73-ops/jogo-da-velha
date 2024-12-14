// Criar a matriz do tabuleiro
let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let vezDoJogador = true;  // Define quem joga: true = Jogador, false = Máquina

// Função que cria as células do tabuleiro
function criarTabuleiro() {
    const tabuleiroDiv = document.getElementById('tabuleiro');
    tabuleiroDiv.innerHTML = ''; // Limpa o tabuleiro para redesenhar
    
    tabuleiro.forEach((celula, index) => {
        const div = document.createElement('div');
        div.classList.add('celula');
        div.innerText = celula;
        div.addEventListener('click', () => fazerJogada(index));
        tabuleiroDiv.appendChild(div);
    });
}

// Função para fazer a jogada
function fazerJogada(index) {
    if (tabuleiro[index] !== '') return; // Evita jogada em célula ocupada
    
    tabuleiro[index] = vezDoJogador ? 'X' : 'O';
    vezDoJogador = !vezDoJogador; // Alterna a vez entre jogador e máquina
    criarTabuleiro(); // Atualiza o tabuleiro
    verificarVencedor(); // Verifica se há vencedor
}

// Função para verificar se alguém ganhou
function verificarVencedor() {
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];
    
    for (let combinacao of combinacoes) {
        const [a, b, c] = combinacao;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            alert(`${tabuleiro[a]} ganhou!`);
            reiniciarJogo(); // Reinicia o jogo
            return;
        }
    }
    
    if (!tabuleiro.includes('')) {
        alert('Empate!');
        reiniciarJogo(); // Reinicia o jogo
    }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    vezDoJogador = true; // Jogador começa primeiro
    criarTabuleiro();
}

// Inicia o tabuleiro
criarTabuleiro();
