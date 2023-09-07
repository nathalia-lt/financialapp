

export default class ItemTransaction{
    
    constructor(){

    }

    /**
     * @param {object} transaction { description: string, value: float, type: string 'income'|'expense', date: string, id: string }
     * @return {string} template html
     */
    static render (transaction) {
        const { description, value, type, date, id } = transaction;

        return `
        <div class='transaction-container' style='display: flex;'>
            <p>${description}</p>
            <p>${value}</p>
            <p>${type}</p>
            <p>${date}</p>
            <button class='delete-transaction' data-id:"${id}">Delete</button>
        <div>
        `
    }
}