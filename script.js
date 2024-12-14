<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jogo da Velha</title>
    <style>
        .tabuleiro { display: grid; grid-template-columns: repeat(3, 100px); grid-gap: 5px; }
        .celula { width: 100px; height: 100px; text-align: center; line-height: 100px; font-size: 24px; border: 1px solid #000; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Jogo da Velha: Jogador vs Máquina</h1>
    <div id="tabuleiro" class="tabuleiro"></div>
    <script>
        let tabuleiro = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        let jogador = 'X';  // Jogador começa
        let maquina = 'O';

        // Função para desenhar o tabuleiro
        function desenharTabuleiro() {
            const tabuleiroDiv = document.getElementById('tabuleiro');
            tabuleiroDiv.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const celula = document.createElement('div');
                celula.classList.add('celula');
                celula.textContent = tabuleiro[i];
                celula.onclick = () => jogar(i);
                tabuleiroDiv.appendChild(celula);
            }
        }

        // Função para jogar
        function jogar(posicao) {
            if (tabuleiro[posicao] !== ' ') return;  // Verifica se a posição está vazia

            tabuleiro[posicao] = jogador;
            desenharTabuleiro();
            
            if (verificarVitoria(jogador)) {
                alert('Você ganhou!');
                return;
            }

            // Se o jogo não terminou, a máquina joga
            if (!tabuleiro.includes(' ')) {
                alert('Empate!');
                return;
            }

            // Máquina faz a jogada (aleatória)
            jogadaMaquina();
        }

        // Função para a máquina jogar
        function jogadaMaquina() {
            let posicao = Math.floor(Math.random() * 9);
            while (tabuleiro[posicao] !== ' ') {
                posicao = Math.floor(Math.random() * 9);
            }
            tabuleiro[posicao] = maquina;
            desenharTabuleiro();

            if (verificarVitoria(maquina)) {
                alert('A máquina ganhou!');
                return;
            }
        }

        // Função para verificar vitória
        function verificarVitoria(jogador) {
            const combinacoes = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Linhas
                [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Colunas
                [0, 4, 8], [2, 4, 6]               // Diagonais
            ];

            return combinacoes.some(combinacao => 
                combinacao.every(i => tabuleiro[i] === jogador)
            );
        }

        // Inicializa o jogo
        desenharTabuleiro();
    </script>
</body>
</html>
