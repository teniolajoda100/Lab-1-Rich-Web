class MemoryGame extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
    
    //check if even number of cards
    if (this.totalCards % 2 !== 0) {
        console.error('Grid must have even number of cards');
        return;
    }
    
    this.createBoard();
}
generateCardPairs() {
    const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
    
    const pairsNeeded = this.totalCards / 2;
    const cards = [];
    
    for (let i = 0; i < pairsNeeded; i++) {
        const shape = shapes[i % shapes.length];
        const color = colors[Math.floor(i / shapes.length) % colors.length];
        
        //create two identical cards for matching
        cards.push({ shape, color });
        cards.push({ shape, color });
    }
    
    //shuffle the cards
    return cards.sort(() => Math.random() - 0.5);
}
async createBoard() {
    const cards = this.generateCardPairs();
    
    //fetching and importingCSS
    const cssResponse = await fetch('memorygame.css');
    const cssText = await cssResponse.text();
    
    this.shadowRoot.innerHTML = `
        <style>
            ${cssText}
            .game-board {
                grid-template-columns: repeat(${this.cols}, 1fr);
                grid-template-rows: repeat(${this.rows}, 1fr);
            }
        </style>
        <div class="game-board" id="board"></div>
    `;
    
    const board = this.shadowRoot.getElementById('board');
    
    cards.forEach((card, index) => {
        const shapeCard = document.createElement('shape-card');
        shapeCard.setAttribute('shape', card.shape);
        shapeCard.setAttribute('color', card.color);
        shapeCard.dataset.index = index;
        shapeCard.dataset.shape = card.shape;
        shapeCard.dataset.color = card.color;
        board.appendChild(shapeCard);
    });
}
}


customElements.define('memory-game', MemoryGame);