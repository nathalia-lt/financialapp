import CashBook from "../models/CashBook";

export default class EditItemForm {

    constructor() {

    }

    /**
     * @param {object} transaction
     * @param {object} cashbooks 
     * @returns 
     */

    static render(cashbooks, transaction, cashbook) {
        const { description, value, type, date, id } = transaction;
        console.log(transaction)

        console.log(date.split('/'));


        // const splitDate = date.split('/');
        // let month = splitDate[0];
        // let day = splitDate[1];
        // let year = splitDate[2];

        //eu dei nome para os valores da array [month,....]
        //eu dou nome para as posicoes da minha array.
        let [month, day, year] = date.split('/');

        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        const date1 = year + "-" + month + "-" + day;
        console.log(date1)
        //coloca div com classe display e nao display none
        return `<button id='close-edit-form' class='close-edit-form'>X</button> 
        <form>
                <fieldset>
                <label for='cashbooks'>Select a Cashbook</label>
                <select name='cashbooks' id='edit-cashbooks'>
                    ${EditItemForm.renderCashbooksOptions(cashbooks, cashbook.id)}                    
                </select>
                <button>New Cashbook</button>
                </fieldset>

                <fieldset class='add-cashbook-container'>
                    <input type="text" >
                    <button>Cancel</button>
                    <button>Create Cashbook</button>
                </fieldset>

                <fieldset>
                    <legend>Type of transaction</legend>
                    
                    <input name="edit-transaction" type="radio" id='expense' value='2' ${type == 2 ? 'checked' : ''} /><label for='expense'>Expense</label>

                    <input name="edit-transaction" type="radio" id='income' value='1' ${type == 1 ? 'checked' : ''}/><label for='income' >Income </label>
                </fieldset>

                <fieldset>
                    <label for='description' >Description:</label>
                    <input type="Text" id='edit-description' name='description' value="${description}" />  
                </fieldset>
                
                <fieldset>
                    <label for='value'>Value:</label>
                    <input type="number" id='edit-value' name='value' min='0.01' step='0.01' value="${value}"/>
                </fieldset> 

                <fieldset> 
                    <label for='date'>Date:</label>
                    <input type="date" id='edit-date' name='date'/ value="${date1}">   
                </fieldset> 
                
                <button id='save-btn' class='save-btn'> Save
                </button>
            </form>

        `
    }

    /**
         * 
         * @param {object} cashbooks
         * @param {string}, cashbook ao qual meu item pertence
         */
    static renderCashbooksOptions(cashbooks, cashbook_id) {
        let template = ''

        console.log(cashbooks)
        console.log(cashbook_id)

        //aqui eu tenho que trocar pra cashbook
        cashbooks.forEach(( cashbook ) => {
            const option = `<option value='${cashbook.id}' ${cashbook.id == cashbook_id ? 'selected' : ''}>${cashbook.title}</option>`
            template += option
        })

        return template
    }
}