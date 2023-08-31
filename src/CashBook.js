import Item from './Item';
//eu estou importando item (que e uma classe e vou usar dentro de outra classe, no caso cashBook)
import { getFromStorage, setToStorage } from '../services/localStorage.js';


//tati
//nesse projeto, temos duas classes como model?
//cashbook e item?? ambos fazem alteracoes.
//btw meu storage nao ta funcionando, mudei ele algumas vezes de lugar pq achei que era isso. mas nao
//ate apareceu os valores la de lancamento, porem nao esta em formato de objeto


export default class CashBook {
    //tati
    //aqui eu estou tentando fazer sentido, eu tenho que pegar tudo do meu item e colocar no storage, certo?? Pq aqui nao coloco no construtor? ja que vou receber uma array vazia de transacoes ou se nao vou "cria-la" com o que tenho no storage
    #transactions = getFromStorage(Item) || [];
    //#transactions
    #balance = 0;

    constructor() {
        //testando, coloquei dentro do construtor pq irei contruir uma array no meu storage. faz sentido?
        //this.#transactions = getFromStorage(Item) || [];
    }

    /**
     * Adiciona um novo lançamento ao livro caixa
     * @param {Item} item
     * @returns {void}
     */
    addTransaction(item) {
        this.#transactions.push(item);
        //quando eu vou fazer um lancamento, eu tenho que atualizar o saldo
        this.#updateBalance(item);
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
        //tati
        //aqui a unica coisa que atualizo no storage is o balance? ja que e a unica coisa que estou alterando nessa funcao
        setToStorage(this.#balance)
    }
    get transactions(){
        return this.#transactions
    }
    
    get balance() {
        return this.#balance;
    }
    //tati
    //estou pensando que a pessoa possa ter lancado o alguma coisa por engano e queira editar. Nesse caso a minha funcao nao pode ser privada, ne?
    editTransaction(index, newTransaction){
        this.#transactions[index] = newTransaction
        setToStorage(this.#transactions)
    }
    removeTransaction(transactionToRemove){
        this.#transactions = this.#transactions.filter((transaction) => transaction !== transactionToRemove)
        setToStorage(this.#transactions)
    }
}
