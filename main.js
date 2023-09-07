import './style.css'
import Item from './src/models/Item'
import CashBook from './src/models/CashBook'
import Storage from './src/services/Storage'
import ItemTransaction from './src/views/ItemTransaction'

//aqui eu criei um storage userpreferences e salvei um valor nele
const userPreferencesStorage = new Storage('userPreferences')
userPreferencesStorage.set({ color: 'red' })




//pq aí no cashbook eu nao preciso importar ele.
// Dependency injection = quando se passa um objeto dentro do construtor.

const cashBookStorage = new Storage('cashBook')
const cashBook = new CashBook(cashBookStorage, 'Daily Expenses')


const storageViagem = new Storage('cashBookTrip')
const cashBookTrip = new CashBook(storageViagem, 'NYC Trip')



// estou criando objetos que seguem o modelo class Item
const primeiro_gasto = new Item(Item.EXPENSES, 'compras', 1000, Item.currentDate)
const entrada = new Item(Item.INCOME, 'salario', 5000)
// console.log('entrada', entrada)

//pq esse console.log nao funciona? nao tem nada de errado com upperCase
console.log('to string', entrada.toString)
console.log('pri gastos', primeiro_gasto)


const app = document.getElementById('app')

app.innerHTML = `
  <h1>Hello Financial App!</h1>
`

function renderButton() {
  const button = document.createElement('button')
  console.log(button)
  button.classList.add('add-btn')

  button.innerText = 'Botão'

  button.addEventListener('click', () => {
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

  app.appendChild(button)

  // return button
}



/**
 * 
 * @param {CashBook} cashbook 
 */
function renderCashBook(cashbook, id) {
  const div = document.createElement('div')
  div.id = id
  div.classList.add('cashbook-container')

  const title = document.createElement('h2')
  title.innerText += cashbook.title
  div.appendChild(title)

  cashbook.transactions.forEach(transaction => {
    const html = ItemTransaction.render(transaction)
    div.insertAdjacentHTML('beforeend', html)
  })



  app.appendChild(div)
}



renderButton()
renderCashBook(cashBook, 'daily-expenses')
renderCashBook(cashBookTrip, 'trip-expenses')


