import { expect, test, describe } from 'vitest'
import Item from '../Item'

describe('constructor', () => {
    test('it should create an object without a date being provided', () => {

        const item = new Item(Item.INCOME, 'allowance', 800)

        expect(item).toBeInstanceOf(Item)
        expect(item.type).toBe(Item.INCOME)
        expect(item.typeToString).toBe('income')
        expect(item.description).toBe('allowance')
        expect(item.value).toBe(800)
        expect(item.date).not.toBe(null)
    })

    test('it should create an object with a date being provided', () => {

        const item = new Item(Item.INCOME, 'allowance', 800, new Date('2021-01-01'))

        expect(item).toBeInstanceOf(Item)
        expect(item.type).toBe(Item.INCOME)
        expect(item.description).toBe('allowance')
        expect(item.value).toBe(800)
        expect(item.date).not.toBe(null)
        // expect(item.date).toBe('2021-01-01')
    })
})


test('can create a copy of an item', () => {
    const item_a = new Item(Item.INCOME, 'allowance', 800)

    const item_b = Item.copy(item_a)

    expect(item_b).toBeInstanceOf(Item)
    expect(item_b.type).toBe(Item.INCOME)
    expect(item_b.description).toBe('allowance')
    expect(item_b.value).toBe(800)
})