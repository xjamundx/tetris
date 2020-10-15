class HTMLGrid {
  constructor(grid, sel) {
    this.grid = grid;
    this.el = document.querySelector(sel);
    this.setupBoard();
  }
  setupBoard() {
    this.grid.getBoardWithActiveShape().forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      row.forEach(() => {
        const squareDiv = document.createElement("div");
        squareDiv.className = "square";
        rowDiv.appendChild(squareDiv);
      });
      this.el.appendChild(rowDiv);
    });
  }

  render() {
    this.grid.getBoardWithActiveShape().forEach((row, i) => {
      row.forEach((square, j) => {
        const squareDiv = this.el.children[i].children[j];
        squareDiv.style.backgroundColor = square.color || "";
      });
    });
  }
}

export default HTMLGrid;
