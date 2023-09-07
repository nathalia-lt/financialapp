import Item from './Item';
//eu estou importando item (que e uma classe e vou usar dentro de outra classe, no caso cashBook)

//vou ter um model para cada objeto, model é para estruturar o meu problema, modelar mesmo. explicando o que meu programa faz, responsavel por fazer funcionar. eu nao preciso um view para cada model necessariamente.

export default class CashBook {
    #transactions = [];
    //#transactions
    #balance = 0;
    #storage = null;
    #title = '';


    constructor(storage, title) {
        //ele inicia as propriedades do cashbook, inicia o cashbook
        this.#storage = storage // na memoria de persistencia, memoria do disco rigido HD.      
        this.#transactions = storage.get()?.transactions || []
        this.#balance = storage.get()?.balance || 0 //na memoria RAM, fechou a janela some
        this.#title = title
    }

    /**
     * Adiciona um novo lançamento ao livro caixa
     * @param {Item} item
     * @returns {void}
     */
    addTransaction(item) {
        //quando eu adiciono uma transacao eu faco um push para minhas transactions

        //aqui eu estou fazendo o push daquele objeto simples (para o meu local storage poder ler) que tive que criar na minha class Item
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
    //funcao privada para eu salvar o estado atual no local storage
    //vai salvar no storage minha transaction e meu balance
    //vou salvar as informacoes toda de uma vez
    #persist() {
        this.#storage.set(
            {
                transactions: this.#transactions,
                balance: this.#balance
            }
        )
    }

    get title() {
        return this.#title;
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
    editTransaction(oldTransaction, newTransaction) {
        this.#transactions = this.#transactions.map (transaction => {
            if (transaction === oldTransaction){
                return newTransaction
            }
            return transaction
        })
        
        this.#persist()
    }
    removeTransaction(transactionToRemove) {
        this.#transactions = this.#transactions.filter((transaction) => transaction !== transactionToRemove)
        
        this.#persist()
    }
}
