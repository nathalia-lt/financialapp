//view
import ItemTransaction from "./ItemTransaction"


export default class CashbookView{


    constructor(){

    }
    /**
   * @param {CashBook} cashbook 
   */
    static render(cashbook, app_html, handle_click){
        const cashbook_container = document.createElement('div')
        cashbook_container.id = cashbook.id 
        cashbook_container.classList.add('cashbook-container')
        
        const details = document.createElement('details')
        
        const summary = document.createElement('summary')
        
        const title = document.createElement('h2')
        title.style.display = 'inline-block'
        title.innerText += cashbook.title
        
        summary.appendChild(title)
        details.appendChild(summary)
        
        cashbook_container.appendChild(details)
        
        //eu to pegando o as transactions do meu cashbook, usando o get da minha classe.
        //esse transaction possui aquele objeto simples de array de transacoes.
        
        const transactions_container = document.createElement('div')
        // transactions_container.id = id
        transactions_container.classList.add('transactions-container')
        
        cashbook.transactions.forEach(transaction => {
            const html = ItemTransaction.render(transaction)
            transactions_container.insertAdjacentHTML('beforeend', html)
        })
        
        transactions_container.addEventListener('click', (event) => handle_click(event, cashbook))
        
        details.appendChild(transactions_container)
        app_html.appendChild(cashbook_container)
        
    }
}