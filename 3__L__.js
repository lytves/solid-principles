// Liskov Substitution Principle

// WRONG Principle usage: not all Persons can have "access"
class Person {
    access() {
        console.warn('You have access!');
    }
}

class Frontender extends Person {
    canWriteFrontend() {
    }
}

class Backender extends Person {
    canWriteBackend() {
    }
}

class ForeignPerson extends Person {
    access() {
        throw new Error('You have no access!');
    }
}

function enterSecureStorage(person) {
    person.access();
}

enterSecureStorage(new Person());
enterSecureStorage(new Frontender());
enterSecureStorage(new Backender());

try {
    enterSecureStorage(new ForeignPerson());
} catch (err) {
    console.error(err.toString());
}

// RIGHT Principle usage: Person can be Member and have "access" or can be Guest and has no "access"
class NewPerson {
    isPerson = true;
}

class Member extends NewPerson {
    access() {
        console.warn('You are a Member and have access!');
    }
}

class Guest extends NewPerson {
    access() {
        throw new Error('Guest has no access!');
    }
}

class NewFrontender extends Member {
    canWriteFrontend() {
    }
}

class NewBackender extends Member {
    canWriteBackend() {
    }
}

class NewForeignPerson extends Guest {
}

enterSecureStorage(new NewFrontender());
enterSecureStorage(new NewBackender());

try {
    enterSecureStorage(new NewForeignPerson());
} catch (err) {
    console.error(err.toString());
}

console.warn('=========================');

// WRONG Principle usage: not all Components can be rendered
class Component {
    render() {
        return `<div>This is Component</div>`
    }
}

class HeaderComponent extends Component {
    onInit() {
        console.warn('onInit');
    }
}

class FooterComponent extends Component {
    afterInit() {
        console.warn('afterInit');
    }
}

class HighOrderComponent extends Component {
    render() {
        throw new Error('Render is impossible for this Component!');
    }
}

function renderComponent(component) {
    console.log(component.render());
}

renderComponent(new HeaderComponent());
renderComponent(new FooterComponent());

try {
    renderComponent(new HighOrderComponent());
} catch (err) {
    console.error(err.toString());
}

// RIGHT Principle usage: Component can be
class NewComponent {
    isComponent = true;
}

class TemplateComponent extends Component {
    render() {
        return `<div>This is Template Component</div>`
    }
}

class HPCComponent extends Component {
    render() {
        throw new Error('Render is impossible for HPC Component!');
    }
}

class NewHeaderComponent extends TemplateComponent {
    onInit() {
        console.warn('onInit');
    }
}

class NewFooterComponent extends TemplateComponent {
    afterInit() {
        console.warn('afterInit');
    }
}

class NewHighOrderComponent extends HPCComponent {
}

renderComponent(new NewHeaderComponent());
renderComponent(new NewFooterComponent());

try {
    renderComponent(new NewHighOrderComponent());
} catch (err) {
    console.error(err.toString());
}
