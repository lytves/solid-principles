// Single Responsibility Principle

class News {
    constructor(title, text) {
        this.title = title;
        this.text = text;
        this.modified = false;
    }

    update(text) {
        this.text = text;
        this.modified = true;
    }

    // WRONG Principle usage: Every class should has its own logic
    // toHtml() {
    //     return `
    //         <div class="news">
    //             <h1>${this.title}</h1>
    //             <p>${this.text}</p>
    //         </div>
    //     `;
    // }
    //
    // toJson() {
    //     return JSON.stringify(this, null, 2);
    // }
}

// RIGHT Principle usage
class NewsPrinter {
    constructor(news) {
        this.news = news;
    }

    printHtml() {
        return `
                <div class="news">
                    <h1>${this.news.title}</h1>
                    <p>${this.news.text}</p>
                </div>
            `;
    }

    printJson() {
        return JSON.stringify(this.news, null, 2);
    }

    printXml() {
        return `
                <?xml version="1.0" encoding="UTF-8"?>
                <news>
                    <title>${this.news.title}</title>
                    <text>${this.news.text}</text>
                </news>
            `;
    }
}

const news = new News("Dfinity", " Genesis Launch");

// WRONG Principle usage
// console.warn(news.toHtml());
// console.warn(news.toJson());

// RIGHT Principle usage
const newsPrinter = new NewsPrinter(news);

console.warn(newsPrinter.printHtml());
console.warn(newsPrinter.printJson());
console.warn(newsPrinter.printXml());



