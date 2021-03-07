// Dependency Inversion Principle

// WRONG Principle usage: if changed realization we should edit call-methods
class Fetch {
    request(url) {
        return Promise.resolve('Data from Fetch');
    }
}

class LocalStorage {
    getFromLS() {
        const localStorageData = {data: 'Data from LS'};
        return localStorageData.data;
    }
}

class DataBase {
    constructor() {
        // this.fetch = new Fetch(); // 1st realizations
        this.ls = new LocalStorage(); // 2nd realizations
    }

    getData() {
        // return this.fetch.request('jetbrains.com') // 1st realizations
        return this.ls.getFromLS(); // 2nd realizations
    }
}

const db1 = new DataBase();
console.warn(db1.getData());

// RIGHT Principle usage: creat different realizations for different layers/types

class FetchClient {
    constructor() {
        this.fetch = new Fetch();
    }

    getClient(url) {
        return this.fetch.request(url);
    }
}

class LocalStorageClient {
    constructor() {
       this.ls = new LocalStorage();
    }

    getClient(key) {
        return this.ls.getFromLS(key);
    }
}

class NewDataBase {
    constructor(client) {
        this.client = client;
    }

    getData(uri) {
        return this.client.getClient(uri);
    }
}

const db2 = new NewDataBase(new FetchClient());
console.log(db2.getData('github.com'));

const db3 = new NewDataBase(new LocalStorageClient());
console.log(db3.getData('token'));
