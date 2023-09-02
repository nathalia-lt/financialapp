import {describe, test, expect} from 'vitest'
import  Storage  from '../services/Storage.js'

// Storage Mock
//um ambiente simulado do meu browser storage
function storageMock() {
    let storage = {};

    return {
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
window.localStorage = storageMock();


test('storage', () => {
    const transactionsStorage = new Storage('transactions')
    transactionsStorage.set([])


    const userPreferencesStorage = new Storage('userPreferences')
    userPreferencesStorage.set({color: 'red'})

    expect(transactionsStorage).toBeInstanceOf(Storage)
    expect(userPreferencesStorage).toBeInstanceOf(Storage)
})


