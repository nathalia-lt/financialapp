
// QUANDO EU EXPORTO UMA CLASSE EU EXPORTO TODAS AS FUNCOES DENTRO DELA
export default class Item {

    #type;
    #description;
    #value;
    #date;

    static INCOME = 1;
    static EXPENSES = 2;

    /**
     * Constructor
     * 
     * @param {int} type  1 - income | 2 - expenses
     * @param {string} description describes the item
     * @param {float} value value of the item
     * @param {Date} date date when the item happened
     * 
     */
    constructor(type, description, value, date = null) {
        this.#type = type;
        this.#description = description;
        this.#value = value;
        //?? retorna caso a data nao seja passada no construtor ele cria a data atual
        // (date !== null || date !== undefined) ? date : new Date()
        this.#date = date?.toLocaleDateString() ?? new Date().toLocaleDateString();
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

    get type() {
        return this.#type
    }

    get typeToString() {
        return this.#type === 1 ? 'income' : 'expense';
    }


    get date() {
        return this.#date;
    }

    //setter eu uso para atribuir um valor as minhas propriedades
    //set eu vou receber uma informacao, atribuir um valor.

    //uma static function pode ser acessada mesmo que eu nao tenho um objeto propriamente dito. nao preciso usar a palavra new para usa-la.

    /**
     * @param {Item} item
     */
    static copy(item) {
        console.log(item.date, typeof item.date)
        //eu so consigo acessar item.#type pq estou dentro da clasee
        return new Item(item.#type, item.#description, item.#value,  new Date(item.#date));
    }
    //estou criando essa funcao de objeto simples pq meu storage nao armazena objeto, nesse caso o Item 'e uma class de objeto mais complexo
    get transaction() {
        return {
            description: this.#description,
            value: this.#value,
            type: this.typeToString,
            date: this.#date
        }
    }
}


