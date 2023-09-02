import './style.css'
import Item from './src/models/Item'
import CashBook from './src/models/CashBook'
import Storage from './src/services/Storage'


const cashBookStorage= new Storage('cashBook')

const userPreferencesStorage = new Storage('userPreferences')
userPreferencesStorage.set({color: 'red'})


const livro = new CashBook(cashBookStorage)

// estou criando objetos que seguem o modelo class Item
const primeiro_gasto = new Item(Item.EXPENSES, 'compras', 1000, Item.currentDate)
const entrada = new Item(Item.INCOME, 'salario', 5000)
// console.log('entrada', entrada)

//pq esse console.log nao funciona? nao tem nada de errado com upperCase
console.log('to string', entrada.toString)
console.log('pri gastos', primeiro_gasto)


// livro.addTransaction(primeiro_gasto)
// console.log("Lancei uma saida", livro.balance)
// livro.addTransaction(entrada)
// console.log("Lancei uma entrada", livro.balance)

// console.log("PRIMEIRO", primeiro_gasto)







document.querySelector('#app').innerHTML = `
  <h1>Hello Financial App!</h1>
`

