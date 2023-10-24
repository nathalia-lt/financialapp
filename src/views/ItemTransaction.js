import "./ItemTransaction.css"
//eu nunca vou colocar o view dentro do model
//view monta o html

export default class ItemTransaction {

    constructor() {

    }

    /**
     * @param {object} transaction { description: string, value: float, type: string 'income'|'expense', date: string, id: string }
     * @return {string} template html
     */
    static render(transaction) {
        //funcao static para eu nao precisar do new, quando usar fora., 
        //nesse const abaixo eu estou fazendo uma desestruturacao, assim eu nao preciso colocar no meu return ex: transaction.value, transaction.type etc
        const { description, value, type, date, id } = transaction;

        return `
        <div class='transaction-container' data-id="${id}" data-description="${description}" data-value="${value}" data-date="${date}" data-type="${type}">
            <p>${description}</p>
            <p>${value}</p>
            <p>${ItemTransaction.typeToString(type)}</p>
            <p>${date}</p>
            <button class='edit-transaction' data-action="edit" >Edit</button>
            <button class='delete-transaction' data-action="delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="trash-icon" >
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>
            </button>
        <div>
        `
    }
    static typeToString(type) {
        if (type === 2) {
            return 'Expense'
        } else {
            return 'Income'
        }
    }

}