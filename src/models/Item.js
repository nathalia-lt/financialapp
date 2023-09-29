
// QUANDO EU EXPORTO UMA CLASSE EU EXPORTO TODAS AS FUNCOES DENTRO DELA

//EU NAO PRECISO USAR A PALAVRA new (EU NAO PRECISO DO OBJETO) ANTES DE USAR AS PROPRIEDADES E FUNCOES STATICS. SAO PROPRIEDADES DA CLASSE E NAO DO OBJETO. NAO E EXCLUSIVA DO OBJETO
export default class Item {

    #type;
    #description;
    #value;
    #date;
    #id;

    //saving bits here, using num instand income = 'income'
    static INCOME = 1;
    static EXPENSES = 2;

    /**
     * Constructor
     * 
     * @param {int} type  1 - income | 2 - expenses
     * @param {string} description describes the item
     * @param {float} value value of the item
     * @param {Date|string|null} date date when the item happened
     * 
     */

    //eu nao sei se a data que o user vai usar vai ser a atual, por isso eu coloco aqui date=null e abaixo eu faco a logica
    constructor(type, description, value, date = null) {
        //no construtor eu posso definir coisas internas que vao compor o meu objeto, ex: o que eu estou fazendo na data

        date = this.#parseDate(date);
        this.#validate(type, description, value, date);

        this.#type = parseInt(type);
        this.#description = description;
        this.#value = parseFloat(value);
        //??vai retornar o date atual caso a data seja nula ou indefinida (nao passada no construtor)
        // (date !== null || date !== undefined) ? date : new Date()
        //eu coloquei o primeiro ? para o meu test passar. quer dizer se tiver data passa se nao é nulo
        this.#date = date?.toLocaleDateString() ?? new Date().toLocaleDateString();
        this.#id = this.#generateRandomId();
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
    //uso esse get para quando eu quiser saber o que é e aparecer na tela,
    //acima eu uso numeracao para salvar salvar no banco de dados e ocupar menos espaco
    get typeToString() {
        return this.#type === 1 ? 'income' : 'expense';
    }

    get date() {
        return this.#date;
    }
    get id() {
        return this.#id;
    }

    #generateRandomId = () => {
        return Math.floor(Math.random() * Date.now()).toString(36);
    };

    //setter eu uso para atribuir um valor as minhas propriedades
    //set eu vou receber uma informacao, atribuir um valor.

    //uma static function pode ser acessada mesmo que eu nao tenho um objeto propriamente dito. nao preciso usar a palavra new para usa-la.

    /**
     * recebe um objeto do tipo Item
     * @param {Item} item
     */
    static copy(item) {
        console.log(item.date, typeof item.date)
        //eu so consigo acessar item.#type pq estou dentro da clasee
        return new Item(item.#type, item.#description, item.#value, new Date(item.#date));
    }
    //estou criando essa funcao de objeto simples pq meu storage nao armazena objeto, nesse caso o Item 'e uma class de objeto mais complexo.
    //estou restornando um objeto simples (meu storage so aceita simples e nao tipo class) para poder armazenar no meu storage. ou seja desse jeito a gente consegue .stringfy
    get transaction() {
        return {
            description: this.#description,
            value: this.#value,
            type: this.#type,
            date: this.#date,
            id: this.#id
        }
    }

    #validate(type, description, value) {

        if (!type || (type != Item.INCOME && type != Item.EXPENSES)) {
            throw new Error('Type must be 1 or 2');
        }
        if (description === '') {
            throw new Error('Description must not be empty');
        }
        if (value === '' || value <= 0) {
            throw new Error('Value must be greater than 0');
        }
    }

    #parseDate(date) {

        if (!date) {
            return null;
        }

        if (typeof date === 'string') {
            return new Date(date)
        }

        if (date instanceof Date) {
            return date;
        }

    }
}


