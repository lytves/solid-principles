// Interface Segregation Principle

// WRONG Principle usage: Superclass has methods that are not using for every his child
class Animal {
    constructor(name) {
        this.name = name;
    }

    fly() {
        console.warn(`${this.name} can fly!`);
    }

    walk() {
        console.warn(`${this.name} can walk!`);
    }

    swim() {
        console.warn(`${this.name} can swim!`);
    }
}

class Dog extends Animal {
    fly() {
        return null;
    }
}

class Eagle extends Animal {
    swim() {
        return null;
    }
}

class Whale extends Animal {
    fly() {
        return null;
    }

    walk() {
        return null;
    }
}

const dog1 = new Dog('Rex');
dog1.fly();
dog1.walk();
dog1.swim();
console.warn('_________');

const eagle1 = new Eagle('Keen eye');
eagle1.fly();
eagle1.walk();
eagle1.swim();
console.warn('_________');

const whale1 = new Whale('Blue Big');
whale1.fly();
whale1.walk();
whale1.swim();
console.warn('_________');

// RIGHT Principle usage: Superclass declare only common methods
class NewAnimal {
    constructor(name) {
        this.name = name;
    }
}

const swimmer = {
    swim() {
        console.warn(`${this.name} can swim!`);
    }
}

const flier = {
    fly() {
        console.warn(`${this.name} can fly!`);
    }
}

const walker = {
    walk() {
        console.warn(`${this.name} can walk!`);
    }
}

class NewDog extends NewAnimal {
}

class NewEagle extends NewAnimal {
}

class NewWhale extends NewAnimal {
}

Object.assign(NewDog.prototype, walker, swimmer);
Object.assign(NewEagle.prototype, walker, flier);
Object.assign(NewWhale.prototype, swimmer);

const dog2 = new NewDog('Rex-2');
dog2.walk();
dog2.swim();
console.warn('_________');

const eagle2 = new NewEagle('Keen eye-2');
eagle2.fly();
eagle2.walk();
console.warn('_________');

const whale2 = new NewWhale('Blue Big-2');
whale2.swim();
console.warn('_________');
