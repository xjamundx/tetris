class Shape {
    constructor(definition, color) {
        this.x = 0;
        this.y = 0;
        this.color = color;
        this.definition = definition;
        this.resetDimensions();
        if (Math.random() > .5) this.mirror();
    }

    mirror() {
        const dims = Array(this.height).fill("").map(() => Array(this.width).fill(false))
        for (let i = this.width - 1; i >= 0; i--) {
            for (let j = 0; j < this.height; j++) {
                dims[j][this.width - 1 - i] = this.definition[j][i]
            }
        }
        this.definition = dims
        this.resetDimensions();
    }

    rotateRight() {
        // swap width and height
        const dims = Array(this.width).fill("").map(() => Array(this.height).fill(false))
        for (let j = 0; j < this.width; j++) {
            for (let i = this.height - 1; i >= 0; i--) {
                dims[j][this.height - 1 - i] = this.definition[i][j]
            }
        }
        // TODO: check to ensure we're in bounds
        this.definition = dims
        this.resetDimensions();
    }

    rotateLeft() {
        const dims = Array(this.width).fill("").map(() => Array(this.height).fill(false))
        for (let i = this.width - 1; i >= 0; i--) {
            for (let j = 0; j < this.height; j++) {
                dims[this.width - 1 - i][j] = this.definition[j][i]
            }
        }

        // TODO: check to ensure we're in bounds
        this.definition = dims
        this.resetDimensions();
    }

    resetDimensions() {
        this.width = this.definition[0] ? this.definition[0].length : 1;
        this.height = this.definition.length;
    }

    static square(color) {
        return new Shape(
            Array(2)
                .fill("")
                .map((x) => Array(2).fill(true)),
            color
        );
    }

    static letterL(color) {
        const arr = Array(3)
            .fill("")
            .map((x) => Array(2).fill(""));
        arr[2][0] = arr[2][1] = arr[1][0] = arr[0][0] = true;
        return new Shape(arr, color);
    }

    static stick(color) {
        return new Shape(Array(4).fill([true]), color);
    }

    static singleHump(color) {
        const arr = Array(3)
            .fill("")
            .map((x) => Array(2).fill(false));
        arr[0][0] = arr[1][0] = arr[2][0] = arr[1][1] = true;
        return new Shape(arr, color);
    }

    static letterN(color) {
        const arr = Array(3)
            .fill("")
            .map((x) => Array(2).fill(false));
        arr[0][0] = arr[1][0] = arr[1][1] = arr[2][1] = true;
        return new Shape(arr, color);
    }

    static random() {
        const randomColor = () => Math.ceil(Math.random() * 255);
        // const shapes = ["square"];
        const shapes = ["letterN", "stick", "singleHump", "letterL", "square"];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
        return this[shape](color);
    }
}

export default Shape