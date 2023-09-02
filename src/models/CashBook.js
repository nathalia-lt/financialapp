import Item from './Item';
//eu estou importando item (que e uma classe e vou usar dentro de outra classe, no caso cashBook)


export default class CashBook {
    #transactions = [];
    //#transactions
    #balance = 0;
    #storage = null;

    constructor(storage) {
        this.#storage = storage // na memoria de persistencia        
        this.#transactions = storage.get()?.transactions || []
        this.#balance = storage.get()?.balance || 0 //na memoria RAM
    }

    /**
     * Adiciona um novo lançamento ao livro caixa
     * @param {Item} item
     * @returns {void}
     */
    addTransaction(item) {
        this.#transactions.push(item.transaction);
        //quando eu vou fazer um lancamento, eu tenho que atualizar o saldo
        this.#updateBalance(item);

        this.#persist();
    }

    /**
     * Atualiza o saldo do livro caixa
     * @param {Item} item o último item adicionado
     * @returns {void}
     */
    #updateBalance(item) {
        //aqui eu estou acessando uma propriedade da minha classe item (propriedade: INCOME), e eu so consigo fazer isso sem ter que criar uma new item pq essa e uma propriedade static.
        if (item.type === Item.INCOME) {
            this.#balance += item.value;
        } else {
            this.#balance -= item.value;
        }
    }
    //funcao provada para eu salvar o estado atual no local storage
    #persist() {
        this.#storage.set(
            {
                transactions: this.#transactions,
                balance: this.#balance
            }
        )
    }

    get transactions() {
        return this.#transactions
    }

    get balance() {
        return this.#balance;
    }
    //tati
    //estou pensando que a pessoa possa ter lancado o alguma coisa por engano e queira editar. Nesse caso a minha funcao nao pode ser privada, ne?
    // pensar mais na lógica
    editTransaction(index, newTransaction) {
        this.#transactions[index] = newTransaction
        
        this.#persist()
    }
    removeTransaction(transactionToRemove) {
        this.#transactions = this.#transactions.filter((transaction) => transaction !== transactionToRemove)
        
        this.#persist()
    }
}
