import './style.css'
import Item from './src/models/Item'
import CashBook from './src/models/CashBook'
import Storage from './src/services/Storage'
import ItemTransaction from './src/views/ItemTransaction'


//class tem methodos e propriedades
//methodos sao as funcoes

class App{

  #cashbooks = []; 
  #app_html = null;

  constructor(cashbooks){
    this.#cashbooks = cashbooks
    this.#app_html = document.getElementById('app')

    this.#app_html.innerHTML = `
      <h1>Hello Financial App!</h1>
    `
  }

  init() {
    this.#renderButton()
    this.#cashbooks.forEach(({object, id}) => {
      this.#renderCashBook(object, id)
    })
  }

/**
 * @param {string} id it is the container identification
 * @param {CashBook} cashbook 
 */
#renderCashBook(cashbook, id) {
  const cashbook_container = document.createElement('div')
  cashbook_container.id = id
  cashbook_container.classList.add('cashbook-container')

  const title = document.createElement('h2')
  title.innerText += cashbook.title
  cashbook_container.appendChild(title)

  //eu to pegando o as transactions do meu cashbook, usando o get da minha classe.
  //esse transaction possui aquele objeto simples de array de transacoes.

  const transactions_container = document.createElement('div')
  // transactions_container.id = id
  transactions_container.classList.add('transactions-container')

  cashbook.transactions.forEach(transaction => {
    const html = ItemTransaction.render(transaction)
    transactions_container.insertAdjacentHTML('beforeend', html)
  })

  transactions_container.addEventListener('click', (event) => this.#handle_click(event, cashbook))

  cashbook_container.appendChild(transactions_container)
  this.#app_html.appendChild(cashbook_container)
}
//funcao privada so pode ser acessada dentro da classe
/**
 * 
 * @param {MouseEvent} event 
 * @param {CashBook} cashbook 
 * @returns {void} //void e vazio
 */
#handle_click(event, cashbook) {
  if (event.target.nodeName !== 'BUTTON') return
  // console.log(deleteBtn.dataset)

  const action = event.target.dataset.action

  const transaction_el = event.currentTarget.querySelector('.transaction-container')
  const id = transaction_el.dataset.id
  console.log(id)

  if (action === 'delete') {
    //apagar no model
    cashbook.removeTransaction(id)
    //apagar na view
    transaction_el.remove()
  } else if (action === 'edit') {
    // open a modal to edit the transaction
  }
}

  #renderButton() {
    const button = document.createElement('button')
    console.log(button)
    button.classList.add('add-btn')
  
    button.innerText = 'create fake transactions'
  
    button.addEventListener('click', () => {
      // estou criando objetos que seguem o modelo class Item
      const primeiro_gasto = new Item(Item.EXPENSES, 'compras', 1000, Item.currentDate)
      const entrada = new Item(Item.INCOME, 'salario', 5000)
      cashBook.addTransaction(primeiro_gasto)
      const div = document.getElementById('daily-expenses')
      const html = ItemTransaction.render(primeiro_gasto.transaction)
      div.insertAdjacentHTML('beforeend', html)
  
      console.log("Lancei uma saida", cashBook.balance)
      cashBookTrip.addTransaction(entrada)
      const divtrip = document.getElementById('trip-expenses')
      const htmltrip = ItemTransaction.render(primeiro_gasto.transaction)
      divtrip.insertAdjacentHTML('beforeend', htmltrip)
  
      console.log("Lancei uma entrada", cashBookTrip.balance)
      console.log('clicked')
  
    })
    this.#app_html.appendChild(button)
  }

}

/**
 * pq aí no cashbook eu nao preciso importar ele.
 * Dependency injection/ injetando via construtor= quando se passa um objeto dentro do construtor. eu so uso as funcionalidades classe, eu nao crio o objeto da classe. Eu uso as funcionalidades nesse caso do storage.
 * const cashBookStorage = new Storage('cashBook') = aqui eu estou criando uma classe local storage com a key = cashbook (mas poderia ser outro nome). pq no construtor do meu objeto é o que ele esta criando.
 */

//instanciamento, criando as condicoes para o programa comecar


const cashBookStorage = new Storage('cashBook')
const cashBook = new CashBook(cashBookStorage, 'Daily Expenses')

//outro exemplo de dependency injection
//vai criar uma nova key no meu localstorage
const storageViagem = new Storage('cashBookTrip')
const cashBookTrip = new CashBook(storageViagem, 'NYC Trip')

const cashbooks = [
  {object: cashBook, id: 'daily-expenses'},
  {object: cashBookTrip, id: 'trip-expenses'}
]

const app = new App(cashbooks)
app.init()



