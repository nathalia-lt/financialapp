import './style.css'
import Item from './src/models/Item'
import CashBook from './src/models/CashBook'
import Storage from './src/services/Storage'
import ItemTransaction from './src/views/ItemTransaction'
import InsertItemForm from './src/views/InsertItemForm'
import CashbookView from './src/views/CashbookView'
import EditItemForm from './src/views/EditItemForm'


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
    this.#cashbooks.forEach((cashbook) => {

      CashbookView.render(cashbook, this.#app_html)

      const transactions_container = document.getElementById(cashbook.id)

      //arrow function nao tem this
      transactions_container.addEventListener('click', (event) => {
        this.#handle_click(event, cashbook)
      })
    })
    //eu estou adicionando um evento de click no container transactions, que vai ser tratado pela funcao handle click. Essa vai verificar se for um botao. vai ver se e edit or add e vai executar


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
    const transaction_id = transaction_el.dataset.id
    console.log(transaction_id)

    if (action === 'delete') {
      //apagar no model
      cashbook.removeTransaction(transaction_id)
      //apagar na view
      transaction_el.remove()
    } else if (action === 'edit') {
      // open a modal to edit the transaction
      // {...} Nesse caso indica o que eu quero adicionar no meu objeto transaction
      //aqui eu poderia mudar o nome da variavel para trasactionToBeEdit??
      const transactionToBeEdit = { ...transaction_el.dataset }
      const modal = document.createElement('div')
      modal.classList.add('modal-container')

      //eu tenho que adicionar o show-modal dentro do content e nao no container
      //modal.classList.add('show-modal')

      const modalContent = EditItemForm.render(this.#cashbooks, transactionToBeEdit, cashbook)
      //colocar esse formulario dentro do modal, colocar uma div. 

      //acho que do jeito que eu estou adicionando esta errado
      modal.insertAdjacentHTML('beforeend', modalContent)
      //modal.appendChild(modalContent)

      this.#app_html.appendChild(modal)


      const closeModal = document.getElementById('close-edit-form')
      //adicionar o event listener pra fechar o modal
      //para fechar o meu modal eu tenho que remover a class show-modal
      //div e sempre block por padrao
      closeModal.addEventListener('click', (e) => {
        console.log('clicked', e.target)
        modal.remove()
      })
      


      const saveBtn = document.getElementById('save-btn')
      saveBtn.addEventListener('click', (e) => {
        e.preventDefault()
        //type, description, value, date virão do formulário
        //eu preciso pegar os valores do meu form
        const cashbook_id = document.getElementById('edit-cashbooks').value
        const type = document.querySelector('input[name=edit-transaction]:checked')?.value
        // description
        const description = document.getElementById('edit-description').value
        // value
        const value = document.getElementById('edit-value').value
        // date
        let date = document.getElementById('edit-date').value

        const newTransaction = new Item(type, description, value, date)


        if (cashbook_id === cashbook.id) {
          cashbook.editTransaction(transactionToBeEdit.id, newTransaction)
        } else {
          const newCashbook = this.#cashbooks.filter(cbook => cbook.id === cashbook_id)

          newCashbook[0].addTransaction(newTransaction)
          cashbook.removeTransaction(transaction_id)
        }

        // se no formulário manteve o cashbook

        //se não manteve o cashbook
        // tem que encontrar o cashbook correto na lista de cashbooks
        // pra dai adicionar a transação no cashbook correto 
        // e remover do cashbook antigo

        //depois ainda temos que fechar o modal
        modal.remove();
        this.#cashbooks.forEach((cashbook) => {
          const cashbookContainer = document.getElementById(cashbook.id)
          cashbookContainer.remove()
          CashbookView.render(cashbook, this.#app_html)
          const transactions_container = document.getElementById(cashbook.id)

          transactions_container.addEventListener('click', (event) => {
            this.#handle_click(event, cashbook)
          })
        })


        // e atualizar os valores no view...
      })

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

      this.#cashbooks.forEach((cashbook) => {
        if (cashbook.id == cashbook_id) {
          cashbook.addTransaction(newItem)
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
const cashBook = new CashBook(cashBookStorage, 'Daily Expenses', 'daily-expenses')

//outro exemplo de dependency injection
//vai criar uma nova key no meu localstorage
const storageViagem = new Storage('cashBookTrip')
const cashBookTrip = new CashBook(storageViagem, 'NYC Trip', 'trip-expenses')

const cashbooks = [cashBook, cashBookTrip]

const app = new App(cashbooks)
app.init()



