import {describe, test, expect} from 'vitest'
import  Storage  from '../services/Storage.js'


//mock and spy sao dois conceitos, vamos usar mock 
// Storage Mock
//um ambiente simulado do meu browser storage
function storageMock() {
    let storage = {};

    return {
      //retorna funcoes que existem no meu local storage
      setItem: function(key, value) {
        storage[key] = value || '';
      },
      getItem: function(key) {
        return key in storage ? storage[key] : null;
      },
      removeItem: function(key) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function(i) {
        const keys = Object.keys(storage);
        return keys[i] || null;
      }
    };
  }

// mock the localStorage
//aqui eu estou falando pra o window assim: Sempre que voce lê window.localStorage, leia a funcao storageMock()
window.localStorage = storageMock();

//esse teste nao funcionaria sem o mock acima, pq o meu storage "oficial", esta no browers e nao no meu ambiente de programa
test('storage', () => {
  //aqui eu estou criando um objeto da minha classe storage
    const transactionsStorage = new Storage('transactions')
    transactionsStorage.set([])


    const userPreferencesStorage = new Storage('userPreferences')
    userPreferencesStorage.set({color: 'red'})

    expect(transactionsStorage).toBeInstanceOf(Storage)
    expect(userPreferencesStorage).toBeInstanceOf(Storage)
})


