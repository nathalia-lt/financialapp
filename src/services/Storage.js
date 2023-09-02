//local storage e um servico separado do meu codigo.
//persist data between open and close browser

export default class Storage {
    #key = ''
    
    /**
     * 
     * @param {string} key - is the string that represents the data that we want to get/set from the storage
     * 
     */
    constructor(key){
        this.#key = key;
    }
    get(){
        const value = window.localStorage.getItem(this.#key)
        return value ? JSON.parse(value) : null
    }

    /**
     * @param {array | object} value - array of objects or object.
     */
    set(value){
        //tenho que receber o valor como string e por isso eu to colocando JSON.stringfy
        window.localStorage.setItem(this.#key, JSON.stringify(value))
    }
}


