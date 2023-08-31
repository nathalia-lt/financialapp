//local storage e um servico separado do meu programa.
//persist data between open and close browser


//queremos saber o que queremos pegar
//key, pq queremos saber o que queremos pegar
function getFromStorage(key){
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) : null
}

//para salvar a nossa funcao: set, estamos rcebendo uma key e um valor
function setToStorage(key, value){
    //tenho que receber o valor como string e por isso eu to colocando JSON.stringfy
    window.localStorage.setItem(key, JSON.stringify(value))
}

export {getFromStorage, setToStorage}
