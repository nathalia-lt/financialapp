import "./insertItemForm.css"

export default class InsertItemForm {

    constructor() {

    }
    /**
     * @param {object} cashbooks - 
     * 
     */

    static render(cashbooks){
        // o formulário de inserção de item
        //The self keyword is used to access the static members of the class present in the program
        return `
        
        <details>
            <summary>New Transaction</summary>
            <form class='modal-content'>
                <fieldset>
                <label for='cashbooks'>Select a Cashbook</label>
                <select name='cashbooks' id='cashbooks'>
                    ${InsertItemForm.renderCashbooksOptions(cashbooks)}                    
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
                    
                    <input name="transaction" type="radio" id='expense' value='2' /><label for='expense'>Expense</label>

                    <input name="transaction" type="radio" id='income' value='1'/><label for='income' >Income </label>
                </fieldset>

                <fieldset>
                    <label for='description' >Description:</label>
                    <input type="Text" id='description' name='description' />  
                </fieldset>
                
                <fieldset>
                    <label for='value'>Value:</label>
                    <input type="number" id='value' name='value' min='0.01' step='0.01'/>
                </fieldset> 

                <fieldset> 
                    <label for='date'>Date:</label>
                    <input type="date" id='date' name='date'/>   
                </fieldset> 
                
                <button id='add-item' class='add-item'> Add Item
                </button>
            </form>
        </details>    
        `
    }
    /**
     * 
     * @param {object} cashbooks 
     */
    static renderCashbooksOptions(cashbooks) {
        let template = ''
        //this object e o array de cashbooks
        cashbooks.forEach((cashbook) => {
            const option = `<option value='${cashbook.id}'>${cashbook.title}</option>`
            template += option
        })
        return template
    }
}