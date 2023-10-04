import CashBook from "../models/CashBook";


export default class EditItemForm{

    constructor(){

    }

    /**
     * @param {object} transaction
     * @param {object} cashbooks 
     * @returns 
     */

    static render(cashbooks, transaction, cashbook){
        const { description, value, type, date, id } = transaction;

        //coloca div com classe display e nao display none
        return `
        <form>
                <fieldset>
                <label for='cashbooks'>Select a Cashbook</label>
                <select name='cashbooks' id='cashbooks'>
                    ${InsertItemForm.renderCashbooksOptions(cashbooks, cashbook)}                    
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
                    
                    <input name="transaction" type="radio" id='expense' value='2' ${type == 2 ? 'checked' : ''} /><label for='expense'>Expense</label>

                    <input name="transaction" type="radio" id='income' value='1' ${type == 1 ? 'checked' : ''}/><label for='income' >Income </label>
                </fieldset>

                <fieldset>
                    <label for='description' >Description:</label>
                    <input type="Text" id='description' name='description' value="${description}" />  
                </fieldset>
                
                <fieldset>
                    <label for='value'>Value:</label>
                    <input type="number" id='value' name='value' min='0.01' step='0.01' value="${value}"/>
                </fieldset> 

                <fieldset> 
                    <label for='date'>Date:</label>
                    <input type="date" id='date' name='date'/ value="${date}">   
                </fieldset> 
                
                <button id='add-item' class='add-item'> Add Item
                </button>
            </form>

        `
    }

/**
     * 
     * @param {object} cashbooks
     * @param {string}, cashbook ao qual meu item pertence
     */
static renderCashbooksOptions(cashbooks, cashbook) {
    let template = ''
    
    cashbooks.forEach(({object, id}) => {
        const option = `<option value='${id}' ${cashbook == id ? 'selected' : ''}>${object.title}</option>`
        template += option
    })

    return template
}
}