// 


//js docs
/**
 * Function to add to given numbers
 * @param {number} num1
 * @param {number} num2
 * @returns {number} sum of num1 and num2
 * @throws {TypeError} if any of the params is not a number
 */
export function sum(num1, num2 = 0) {
    //quero ter certeza que e um numero
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new TypeError('Param(s) are not a number(s)')
    }
    return num1 + num2
}


// função que subtrai dois números
//js docs
/**
 * Function to subtract to given numbers
 * @param {number} num1
 * @param {number} num2
 * @returns {number} sum of num1 and num2
 * @throws {TypeError} if any of the params is not a number
 */
export function subtract(num1, num2 = 0) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new TypeError('Param(s) are not a number(s)')
    }
    return num1 - num2
}

// função que multiplica dois números

// função que subtrai dois números
//js docs
/**
 * Function to multiple to given numbers
 * @param {number} num1
 * @param {number} num2
 * @returns {number} sum of num1 and num2
 * @throws {TypeError} if any of the params is not a number
 */
export function multiple(num1, num2 = 0) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new TypeError('Param(s) are not a number(s)')
    }
    return num1 * num2
}


// função que divide dois números

//js docs
/**
 * Function to divide to given numbers
 * @param {number} num1
 * @param {number} num2
 * @returns {number} sum of num1 and num2
 * @throws {TypeError} if any of the params is not a number
 */
export function divide(num1, num2) {

    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new TypeError('Param(s) are not a number(s)')
    }
    if (num2 === 0) {
        throw new TypeError('Cannot divide by zero')
    }
    return num1 / num2
}


// função que calcula o resto da divisão de dois números

//js docs
/**
 * Function to divide to given numbers
 * @param {number} num1 (dividend)
 * @param {number} num2 (divisor)
 * @returns {number} sum of num1 and num2
 * @throws {TypeError} if any of the params is not a number
 */
export function reminder(num1, num2) {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        throw new TypeError('Param(s) are not a number(s)')
    }
    if (num2 === 0) {
        throw new TypeError('Cannot divide by zero')
    }
    return num1 % num2
}

//fazer porcentagem

// Para calcular porcentagem de um valor multiplique a porcentagem que você está procurando pelo próprio valor. Por exemplo, se você quer calcular 35% de 500, multiplique 35 por 500. Fazendo isso você obtém o valor de 35 x 500 = 17500; e divida o valor obtido por 100. ou


/**
 * Find the porcentage
 * @param {number} percent 
 * @param {number} total 
 * @returns 
 *  @throws {TypeError} if any of the params is not a number

 */
export function percentage(percent, total) {
    if (typeof percent !== 'number' || typeof total !== 'number') {
        throw new TypeError('Param(s) are not a number(s)')
    }

    //Math.round  
    //toFixed for monetary formats  
    return Math.round((total*percent)/100);
} 