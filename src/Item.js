
// QUANDO EU EXPORTO UMA CLASSE EU EXPORTO TODAS AS FUNCOES DENTRO DELA
export default class Item {

    #type;
    #description;
    #value;
    #date;

    static INCOME = 1;
    static EXPENSES = 2;
    static currentDate = new Date().toLocaleDateString();



    constructor(type, description, value, date) {
        this.#type = type;
        this.#description = description;
        this.#value = value;
        this.#date = date;
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
        return this.#type
    }

    get date() {
        return this.#date;
    }

    get toString() {
        return `- ${this.#type.toUpperCase()} - ${this.#description} - \$ ${this.#value.toFixed(2)} `;
    }

    //setter eu uso para atribuir um valor as minhas propriedades
    //set eu vou receber uma informacao, atribuir um valor.
    
    //uma static function pode ser acessada mesmo que eu nao tenho um objeto propriamente dito
    static copy(item) {
        return new Item(item.#description, item.#value, item.#type);
    }
}


