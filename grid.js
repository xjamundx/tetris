class Grid {
  constructor(width = 10, height = 20) {
    this.width = width;
    this.height = height;
    this.board = null;
    this.activeShape = null;
    this.fullReset();
  }

  fullReset() {
    this.activeShape = null;
    this.resetGrid();
  }

  resetGrid() {
    this.board = Array.from({ length: this.height }, () =>
      Array(this.width).fill("")
    );
  }

  setActiveShape(shape) {
    shape.x = Math.max(Math.floor(Math.random() * 10) - shape.width, 0);
    shape.y = -shape.height - 1;
    this.activeShape = shape;
  }

  detectTetris() {
    var badRows = [];
    for (let i = this.board.length - 1; i >= 0; i--) {
      if (this.board[i].every((x) => x)) {
        badRows.push(i);
      }
    }
    if (badRows.length) {
      badRows.forEach((i) => {
        this.board.splice(i, 1);
        this.board.unshift(Array(this.width).fill(false));
      });
      return true;
    }
    return false;
  }

  getBoardWithActiveShape() {
    const grid = Array(this.height)
      .fill("")
      .map((a, i) => [...this.board[i]]);

    if (this.activeShape && !this.activeShape.collided) {
      this.addShapeToGrid(this.activeShape, grid);
    }

    this.highlightActiveColumns(this.activeShape, grid);

    return grid;
  }

  highlightActiveColumns(shape, grid) {
    if (!shape) return;
    for (let j = shape.x; j < shape.x + shape.width; j++) {
      for (let i = 0; i < grid.length; i++) {
        if (!grid[i][j]) {
          grid[i][j] = { color: "#333" };
        } else if (grid[i][j] !== shape) {
          break;
        }
      }
    }
  }

  // permanently add any shape to the grid
  addShapeToGrid(shape, grid = this.board) {
    if (!shape) return;
    shape.definition.forEach((row, i) => {
      row.forEach((sqr, j) => {
        let [nx, ny] = [shape.x + j, shape.y + i];
        if (ny < 0) return;
        if (sqr) grid[ny][nx] = shape;
      });
    });
  }

  handleCollision() {
    this.activeShape.collided = true;
    if (this.activeShape.collided) {
      this.addShapeToGrid(this.activeShape);
    }
  }

  willCollide(shape, [x, y]) {
    // hits the bottom
    if (shape.height + y > this.height) {
      return true;
    }

    // hits the left wall or the right wall
    if (x < 0 || x > this.width - shape.width) return true;

    // hits another shape out there somewhere
    for (let i = 0; i < shape.height; i++) {
      for (let j = 0; j < shape.width; j++) {
        if (!shape.definition[i][j]) continue;
        const [ny, nx] = [y + i, x + j];
        if (ny < 0) continue;
        const match = this.board[ny][nx];
        if (match && match !== shape) {
          if (ny === 0) return "end";
          return true;
        }
      }
    }

    // loop over each point in the shape
    return false;
  }
}

export default Grid;
