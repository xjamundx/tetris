class HTMLGrid {
  constructor(grid, sel) {
    this.grid = grid;
    this.el = document.querySelector(sel);
  }

  replaceBoard(el) {
    while (this.el.lastElementChild) {
      this.el.removeChild(this.el.lastElementChild);
    }
    this.el.appendChild(el);
  }

  render() {
    let dom = document.createDocumentFragment();
    this.grid.getBoardWithActiveShape().forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";
      row.forEach((square) => {
        console.log({ square });
        const squareDiv = document.createElement("div");
        squareDiv.className = "square";
        squareDiv.style.backgroundColor = square.color;
        rowDiv.appendChild(squareDiv);
      });
      dom.appendChild(rowDiv);
    });
    this.replaceBoard(dom);
  }
}

export default HTMLGrid;
