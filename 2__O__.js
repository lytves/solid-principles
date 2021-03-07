// Open / Close Principle

// WRONG Principle usage
class Box {
    constructor(side) {
        this.side = side;
        this.type = 'box';
    }
}

class Circle {
    constructor(radius) {
        this.radius = radius;
        this.type = 'circle';
    }
}

class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.type = 'rectangle';
    }
}

class AreaCalculator {
    constructor(shapes = []) {
        this.shapes = shapes;
    }

    calc() {
        // WRONG Principle usage: to implement new logic we should modify existing code
        return this.shapes.reduce((accum, shape) => {
            if (shape.type === 'box') {
                accum += shape.side ** 2;
            } else if (shape.type === 'circle'){
                accum += (shape.radius ** 2) * Math.PI;
            } else if (shape.type === 'rectangle') {
                accum += shape.width * shape.height;
            }
            return accum;
        }, 0);
    }

}

const box1 = new Box(10);
const circle1 = new Circle(5);

const calc1 = new AreaCalculator([box1, circle1]);
console.warn(calc1.calc());

const rect1 = new Rectangle(10,5);

const calc2 = new AreaCalculator([box1, circle1, rect1]);
console.warn(calc2.calc());


// RIGHT Principle usage
class Shape {
    calcArea() {
        throw new Error('Should implement calcArea method');
    }
}

class NewBox extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }

    calcArea() {
        return this.side ** 2;
    }
}

class NewCircle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    calcArea() {
        return (this.radius ** 2) * Math.PI;
    }
}

class NewRectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    calcArea() {
        return this.width * this.height;
    }
}

class NewAreaCalculator {
    constructor(shapes = []) {
        this.shapes = shapes;
    }

    calc() {
        return this.shapes.reduce((accum, shape) => {
            accum += shape.calcArea();
            return accum;
        }, 0);
    }
}

const box2 = new NewBox(10);
const circle2 = new NewCircle(5);
const rect2 = new NewRectangle(10,5);

const newCalc = new NewAreaCalculator([box2, circle2, rect2]);
console.warn(newCalc.calc());
