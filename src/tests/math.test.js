import { expect, test, describe } from 'vitest'
import { sum, divide, subtract, percentage, reminder} from '../math-operations'

//test e uma funcao e essa funcao tem dois params
// test('description', callback)

test('expect true to be true', () => {
    expect(true).toBe(true)
})


describe('function sum', () => {
    test('1 + 2 must be 3', () => {
        expect(sum(1, 2)).toBe(3)
    })

    test('3 + (-5) must be -2', () => {
        expect(sum(3, -5)).toBe(-2)
    })

    test('(-3) + (-5) must be -8', () => {
        expect(sum(-3, -5)).toBe(-8)
    })

    test('(-3) + 5 must be 2', () => {
        expect(sum(-3, 5)).toBe(2)
    })

    test('only one number is provided', () => {
        expect(sum(3)).toBe(3)
    })

    describe('ERROR CASES', () => {
        test('it should throw a typeError when string is provided', () => {
            expect(() => sum('x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => sum(3, 'x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => sum('x', 'y')).toThrow(new TypeError('Param(s) are not a number(s)'))
        })

        test('it should throw a typeError when bool is provided', () => {
            expect(() => sum(false)).toThrow(new TypeError('Param(s) are not a number(s)'))
        })

        test('it should throw a typeError when array is provided', () => {
            expect(() => sum([2])).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
    })
})

//divide

describe('function divide', () => {
    test('10 / 2 must be 5', () => {
        expect(divide(10, 2)).toBe(5)
    })
    test('10 / -2 must be -5', () =>{
        expect(divide(10, -2)).toBe(-5)
    })
    test('-14 / -2 must be 7', () =>{
        expect(divide(-14,-2)).toBe(7)
    })
    describe('error cases', () => {
        test('10 / 0 must be throw and error', () => {
            expect(() => divide(10, 0)).toThrow(TypeError)
        })
    
        test('only one number is provided', () => {
            expect(()=>divide(10)).toThrow(TypeError)
        })
    })

    // 10 : 2 = ? => ? . 2 = 10
    // 10 : 0 = ? => ? . 0 = 10
    // 10 : 0.1 = 100
    // 10 : 0.01 = 1000
    // 10 : 0.001 = 10000
    // 10: 0.000000000000000000001 = 100000000000000000000
})

//-----------------------------------------------------------------------

//subtract

describe('function subtract', () =>{
    test('1 - 1 must be 0', () =>{
        expect(subtract(1,1)).toBe(0)
    })
    test('2 - (- 3) must be 5', () =>{
        expect(subtract(2,-3)).toBe(5)
    })
    test(' -2 - (-4) must be 2', () => {
        expect(subtract(-3,-5)).toBe(2)
    })
    test('-3 -(-2) must be -1', () =>{
        expect(subtract(-3,-2)).toBe(-1)
    })
    test('only one number is provided', () => {
        expect(subtract(-7)).toBe(-7)
    })
    describe('ERROR CASES', () => {
        test('it should throw a typeError when string is provided', () => {
            expect(() => subtract('x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => subtract(3, 'x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => subtract('x', 'y')).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
        test('it should throw a typeError when bool is provided', () => {
            expect(() => subtract(false)).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
        test('it should throw a typeError when array is provided', () => {
            expect(() => subtract([2])).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
    })
})

//reminder

describe('function reminder', () =>{
    test('13 % 5 must be 3', () =>{
        expect(reminder(13,5)).toBe(3)
    })
    test('-13 % 5 must be -3', () =>{
        expect(reminder(-13,5)).toBe(-3)
    })
    test('4 % 2 must be 0', () => {
        expect(reminder(4,2)).toBe(0)
    })
    test('1 % -2 must be 1', () =>{
        expect(reminder(1,-2)).toBe(1)
    })
    test('only one number is provided', () => {
        expect (() => reminder(7)).toThrow(new TypeError('Param(s) are not a number(s)'))
    })
    describe('ERROR CASES', () => {
        test('it should throw a typeError when string is provided', () => {
            expect(() => reminder('x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => reminder(3, 'x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => reminder('x', 'y')).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
        test('it should throw a typeError when bool is provided', () => {
            expect(() => reminder(false)).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
        test('it should throw a typeError when array is provided', () => {
            expect(() => reminder([2])).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
    })
})



//porcentage

describe('function percentage', () =>{
    test('10, 100 must be 10', () =>{
        expect(percentage(10,100)).toBe(10)
    })
    test('35, 500 must be 175', () =>{
        expect(percentage(35,500)).toBe(175)
    })
    //viajei aqui
    test('10 , 500 must be 50', () => {
        expect(percentage(10,500)).toBe(50)
    })
    test('2, -40 must be -0.8', () =>{
        //aqui teria que ser 1 pq e math.round
        expect(percentage(2,-40)).toBe(-1)
    })
    test('only one number is provided', () => {
        //sempre que eu espero um erro eu tenho que jogar na arrow function
        expect(() => percentage(7)).toThrow(TypeError)
    })
    describe('ERROR CASES', () => {
        test('it should throw a typeError when string is provided', () => {
            expect(() => percentage('x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => percentage(3, 'x')).toThrow(new TypeError('Param(s) are not a number(s)'))
            expect(() => percentage('x', 'y')).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
        test('it should throw a typeError when bool is provided', () => {
            expect(() => percentage(false)).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
        test('it should throw a typeError when array is provided', () => {
            expect(() => percentage([2])).toThrow(new TypeError('Param(s) are not a number(s)'))
        })
    })
})


