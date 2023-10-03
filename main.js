import './style.css'
import Item from './src/models/Item'
import CashBook from './src/models/CashBook'
import Storage from './src/services/Storage'
import ItemTransaction from './src/views/ItemTransaction'
import InsertItemForm from './src/views/InsertItemForm'
import CashbookView from './src/views/CashbookView'


//class tem methodos e propriedades
//methodos sao as funcoes

class App {

  #cashbooks = [];
  #app_html = null;

  constructor(cashbooks) {
    this.#cashbooks = cashbooks
    this.#app_html = document.getElementById('app')

    this.#app_html.innerHTML = `
      <h1>Money Tracker</h1>
    `
  }

  init() {
    this.#renderInsertItemForm()
    this.#cashbooks.forEach(({ object, id }) => {
      CashbookView.render(object, id, this.#app_html, this.#handle_click)
    })
  }

  #renderInsertItemForm() {
    const insertForm_template = InsertItemForm.render(this.#cashbooks)
    this.#app_html.insertAdjacentHTML('beforeend', insertForm_template)

    //pegar o botao e adicionar o evento de click
    const addItemBtn = document.getElementById('add-item')
    //aqui estamos chamando a funcao que deve ser chamada quando click
    //this pra quando voce tem event listener, é o elemento clicado, isso so se for chamado como uma funcao.
    // this.#handle_add_item.bind(this)
    addItemBtn.addEventListener('click', this.#handle_add_item.bind(this))
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

  #handle_add_item(event) {
    //prevent default sempre que tem formulario
    event.preventDefault()

    console.log("THIS dentro do handle_add_item", this)
    // pegar do formulário
    //eu estou pegando o valor do meu formulario
    const cashbook_id = document.getElementById('cashbooks').value
    // type
    const type = document.querySelector('input[name=transaction]:checked')?.value

    // description
    const description = document.getElementById('description').value

    // value
    const value = document.getElementById('value').value

    // date
    let date = document.getElementById('date').value


    try {
      const newItem = new Item(type, description, value, date)

      this.#cashbooks.forEach(({ object, id }) => {
        if (id == cashbook_id) {
          console.log(object)
          object.addTransaction(newItem)
        }
      })

      const div = document.getElementById(cashbook_id)
      const html = ItemTransaction.render(newItem.transaction)
      div.insertAdjacentHTML('beforeend', html)

      // this.#cashbooks é um array de objetos
      // cada objeto tem esta forma {object: <cashBook>, id: <string> }
      // adicionar o item no cashbook correto

    } catch (error) {
      alert(error.message)
      return
    }
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
  { object: cashBook, id: 'daily-expenses' },
  { object: cashBookTrip, id: 'trip-expenses' }
]

const app = new App(cashbooks)
app.init()



