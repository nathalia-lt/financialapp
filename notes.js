//Here snipped of my project with comments

//MAIN.js

const livro = new CashBook()

// estou criando objetos que seguem o modelo class Item
const primeiro_gasto = new Item(Item.EXPENSES, 'compras', 1000)
const entrada = new Item(Item.INCOME, 'salario', 5000)
// console.log('entrada', entrada)

//pq esse console.log nao funciona? nao tem nada de errado com upperCase
//console.log('to string', entrada.toString)


livro.adicionarLancamento(primeiro_gasto)
console.log("Lancei uma saida", livro.balance)
livro.adicionarLancamento(entrada)
console.log("Lancei uma entrada", livro.balance)

// console.log("PRIMEIRO", primeiro_gasto)

// primeiro_gasto._value = 5000
// // primeiro_gasto.description = 'Salário'
// console.log('ANTES', primeiro_gasto.x)
// primeiro_gasto.x = 100;
// console.log('DEPOIS', primeiro_gasto.x)


//---------------------------------------------------------------------

//ITEM.js

// unidade de gasto ou de entrada


//class é algo que tem propriedades, methodos e funcoes.
//mas nem toda a class tem tudo.

// QUANDO EU EXPORTO UMA CLASSE EU EXPORTO TODAS AS FUNCOES DENTRO DELA
export default class Item {

    // declarando as propriedades privadas ou nao privada, antes do construtor
    #type;
    #description;
    #value;
    #date;

    //static = a method or property that belongs to a class and NOT any one object. Eu so consigo usar esses methods static no meu objeto original e nao depois que eles ja foram criados

    //pq eu NAO coloco income = income, expenses = expenses
    //pq e mais seguro e economiza espaco, e menos sucetivel a erro de digitacao
    static INCOME = 1;
    static EXPENSES = 2;

    #meuAtributoPrivado = 10;

    //constructor é uma função que vai criar um novo item.
    constructor(type, description, value, date) {
        // this._description é considerado (por convenção) uma proriedade privada do objeto
        // this._description = description;
        // this._value = value;
        // this._type = type;

        //this é methods e propriedade do objeto que vai ser criado.
        //# voce so pode alterar com um method, para dizer que e uma propriedade privada.
        this.type = type;
        this.#description = description;
        this.#value = value;
    }

    // getters e setter
    //ja que com a # nao me permite ter acesso as minhas propriedades
    //get é como eu acesso as propriedades #privadas do construtor, e uma funcao para pegar algo
    get description() {
        return this.#description;
    }

    get value() {
        return this.#value;
    }
    get type(){
        return this.type
    }

    get x() {
        return this.#meuAtributoPrivado;
    }

    get toString() {
        return `- ${this.type.toUpperCase()} - ${this.#description} - \$ ${this.#value.toFixed(2)} `;
    }

    //setter eu uso para atribuir um valor as minhas propriedades
    //set eu vou receber uma informacao, atribuir um valor.
    set x($newValue) {
        this.#meuAtributoPrivado = $newValue;
    }
    //isso e uma funcao, nao precisa a palava function
    //aqui eu fiz uma funcao clone, caso eu queira retornar o meu item com os valores originais
    clone() {
        return new Item(this.#description, this.#value, this.type);
    }
    //uma static function pode ser acessada mesmo que eu nao tenho um objeto propriamente dito
    static copy(item) {
        return new Item(item.#description, item.#value, item.type);
    }
}


//------------------------------------------------------------------------------

//CASHBOOK.js

import Item from './Item';
//eu estou importando item (que e uma classe e vou usar dentro de outra classe, no caso cashBook)


export default class CashBook {

    #lancamentos = [];
    #balance = 0;

    constructor() { }

    /**
     * Adiciona um novo lançamento ao livro caixa
     * @param {Item} item
     * @returns {void}
     */
    adicionarLancamento(item) {
        this.#lancamentos.push(item);
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
    }

    get balance() {
        return this.#balance;
    }
}

