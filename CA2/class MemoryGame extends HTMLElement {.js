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
        // Parse dimensions
        const [rows, cols] = dimensions.split('x').map(s => s.trim());
        console.log(`Setting up ${rows}x${cols} game board`);
    }
}

customElements.define('memory-game', MemoryGame);