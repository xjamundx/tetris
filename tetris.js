import Shape from "./shape.js";
import Grid from "./grid.js";
import HTMLGrid from "./htmlgrid.js";

class Tetris {
  constructor() {
    this.grid = new Grid();
    this.screen = new HTMLGrid(this.grid, "#grid");
    this.previewGrid = new Grid(4, 4);
    this.previewSection = new HTMLGrid(this.previewGrid, "#preview");
    this.TICK_TIME = 300;
    this.gameOver = false;
    this.lines = 0;
    this.isPaused = false;
    this.updatePoints();

    document.addEventListener("keydown", (e) => this.handleKeypress(e));
    document
      .getElementById("restart")
      .addEventListener("click", (e) => this.restart(e));
    document.getElementById("pause").addEventListener("click", (e) => {
      this.isPaused = !this.isPaused;
    });

    this.render();
    this.setupPreview();
    this.addPiece();

    this.tick();
  }

  restart() {
    this.isPaused = false;
    this.lines = 0;
    this.grid.fullReset();
    if (this.gameOver) {
      document.getElementById("gameMessage").classList.add("hidden");
      this.gameOver = false;
      this.tick();
    }
    this.updatePoints();
    this.setupPreview();
    this.addPiece();
  }

  setupPreview() {
    this.previewShape = Shape.random();
    this.updatePreview();
  }

  addPiece() {
    this.currentShape = this.previewShape;
    this.previewShape = Shape.random();
    this.updatePreview();
    this.grid.setActiveShape(this.currentShape);
  }

  updatePreview() {
    this.previewGrid.fullReset();
    this.previewGrid.addShapeToGrid(this.previewShape);
    this.previewSection.render();
  }

  handleKeypress(e) {
    const shape = this.currentShape;
    if (!shape) return;
    switch (e.code) {
      case "Space":
        while (!this.grid.willCollide(shape, [shape.x, shape.y + 1])) {
          shape.y += 1;
        }
        break;
      case "ArrowRight":
        if (!this.grid.willCollide(shape, [shape.x + 1, shape.y])) {
          shape.x += 1;
        }
        break;
      case "ArrowLeft":
        if (!this.grid.willCollide(shape, [shape.x - 1, shape.y])) {
          shape.x -= 1;
        }
        break;
      case "ArrowDown":
        if (!this.grid.willCollide(shape, [shape.x, shape.y + 1])) {
          shape.y += 1;
        }
        break;
      case "KeyL":
        shape.rotateLeft();
        // rotate, but then if we're colliding, immediately rotate back
        if (this.grid.willCollide(shape, [shape.x, shape.y])) {
          shape.rotateRight();
        }
        break;
      case "ArrowUp":
      case "KeyR":
        shape.rotateRight();
        // rotate, but then if we're colliding, immediately rotate back
        if (this.grid.willCollide(shape, [shape.x, shape.y])) {
          shape.rotateLeft();
        }
        break;
    }
    //this.grid.updateGrid();
    this.screen.render();
  }

  render() {
    this.screen.render();
    requestAnimationFrame(() => this.render());
  }

  tick() {
    if (!this.isPaused) {
      if (this.gameOver) {
        document.getElementById("gameMessage").classList.remove("hidden");
        return;
      }
      if (this.currentShape.collided) {
        this.addPiece();
      } else {
        this.movePieceDown();
      }
      if (this.grid.detectTetris()) {
        this.lines += 1;
        this.updatePoints();
      }
    }
    setTimeout(() => this.tick(), this.TICK_TIME);
  }

  updatePoints() {
    const lines = document.getElementById("lines");
    lines.innerHTML = this.lines;
  }

  movePieceDown() {
    const shape = this.currentShape;
    const crash = this.grid.willCollide(shape, [shape.x, shape.y + 1]);
    if (crash) {
      if (crash === "end") {
        this.gameOver = true;
      }
      this.grid.handleCollision();
    } else {
      shape.y += 1;
    }
  }
}

const game = new Tetris();
