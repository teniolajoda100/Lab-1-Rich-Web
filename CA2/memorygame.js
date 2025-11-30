class MemoryGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.canClick = true;
    }

    connectedCallback() {
        const dimensions = this.getAttribute('dimensions') || '3 x 4';
        this.setupGame(dimensions);
    }

    setupGame(dimensions) {
        const [rows, cols] = dimensions.split('x').map(s => s.trim());
        this.rows = parseInt(rows);
        this.cols = parseInt(cols);
        this.totalCards = this.rows * this.cols;
        
        if (this.totalCards % 2 !== 0) {
            console.error('Grid must have even number of cards');
            return;
        }
        
        this.createBoard();
    }

    generateCardPairs() {
        const shapes = ['circle', 'square', 'triangle'];
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        
        const pairsNeeded = this.totalCards / 2;
        const cards = [];
        
        for (let i = 0; i < pairsNeeded; i++) {
            const shape = shapes[i % shapes.length];
            const color = colors[Math.floor(i / shapes.length) % colors.length];
            
            cards.push({ shape, color });
            cards.push({ shape, color });
        }
        
        return cards.sort(() => Math.random() - 0.5);
    }

    async createBoard() {
        const cards = this.generateCardPairs();
        
        // Fetch external CSS file
        const cssResponse = await fetch('memorygame.css');
        const cssText = await cssResponse.text();
        
        this.shadowRoot.innerHTML = `
            <style>
                ${cssText}
                .game-board {
                    grid-template-columns: repeat(${this.cols}, 120px);
                    grid-template-rows: repeat(${this.rows}, 120px);
                }
            </style>
            <div class="game-board" id="board"></div>
        `;
        
        const board = this.shadowRoot.getElementById('board');
        
        cards.forEach((card, index) => {
            const shapeCard = document.createElement('shape-card');
            shapeCard.setAttribute('type', card.shape);
            shapeCard.setAttribute('colour', card.color);
            shapeCard.dataset.index = index;
            shapeCard.dataset.shape = card.shape;
            shapeCard.dataset.color = card.color;
            
            shapeCard.addEventListener('click', () => this.handleCardClick(shapeCard));
            
            board.appendChild(shapeCard);
        });
    }

    handleCardClick(card) {
        if (!this.canClick || this.flippedCards.includes(card) || card.classList.contains('matched')) {
            return;
        }
        
        card.flip();
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.checkForMatch();
        }
    }

    checkForMatch() {
        this.canClick = false;
        const [card1, card2] = this.flippedCards;
        
        const isMatch = card1.dataset.shape === card2.dataset.shape && 
                        card1.dataset.color === card2.dataset.color;
        
        setTimeout(() => {
            if (isMatch) {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.matchedPairs++;
                
                if (this.matchedPairs === this.totalCards / 2) {
                    this.gameWon();
                }
            } else {
                card1.flip();
                card2.flip();
            }
            
            this.flippedCards = [];
            this.canClick = true;
        }, 1000);
    }

    gameWon() {
        setTimeout(() => {
            alert('Congratulations! You found all matches!');
        }, 500);
    }
}

customElements.define('memory-game', MemoryGame);