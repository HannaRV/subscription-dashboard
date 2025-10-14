/**
 * @file Input validation.
 * @module src/middleware/SubscriptionValidation.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'

export class SubscriptionValidation {
    static validateNewSubscription(req, res, next) {
        try {
            const validator = new DataFieldValidator(req.body)
            validator.validate()
            req.body = validator.getSanitizedData()
            next()
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: 'Validation Error',
                message: error.message
            })
        }
    }

    static validateSubscriptionName(req, res, next) {
        try {
            const name = req.params.name

            if (!name || typeof name !== 'string' || name.trim() === '') {
                throw new Error('Invalid subscription name')
            }

            next()
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: 'Validation Error',
                message: error.message
            })
        }
    }
}

class DataFieldValidator {
    static #MAX_NAME_LENGTH = 50
    static #MAX_CATEGORY_LENGTH = 30
    static #VALID_FREQUENCIES = ['weekly', 'monthly', 'yearly']

    #data

    constructor(data) {
        this.#data = data
    }
    validate() {
        this.#validateName()
        this.#validatePrice()
        this.#validateFrequency()
        this.#validateCategory()
    }

    getSanitizedData() {
        return {
            name: this.#data.name.trim(),
            price: Number(this.#data.price),
            frequency: this.#data.frequency,
            category: this.#data.category.trim()
        }
    }

    #validateName() {
        const { name } = this.#data

        if (!name) {
            throw new Error('Name is required')
        }

        if (typeof name !== 'string') {
            throw new Error('Name must be a string')
        }

        if (name.trim().length === 0) {
            throw new Error('Name cannot be empty')
        }

        if (name.length > DataFieldValidator.#MAX_NAME_LENGTH) {
            throw new Error(`Name cannot exceed ${DataFieldValidator.#MAX_NAME_LENGTH} characters`)
        }
    }

    #validatePrice() {
        const price = Number(this.#data.price)

        if (isNaN(price)) {
            throw new Error('Price must be a number')
        }

        if (price < 0) {
            throw new Error('Price cannot be negative')
        }
    }

    #validateFrequency() {
        const { frequency } = this.#data

        if (!frequency || !DataFieldValidator.#VALID_FREQUENCIES.includes(frequency)) {
            throw new Error('Frequency must be weekly, monthly, or yearly')
        }
    }

    #validateCategory() {
        const { category } = this.#data

        if (!category) {
            throw new Error('Category is required')
        }

        if (typeof category !== 'string') {
            throw new Error('Category must be a string')
        }

        if (category.trim().length === 0) {
            throw new Error('Category cannot be empty')
        }

        if (category.length > DataFieldValidator.#MAX_CATEGORY_LENGTH) {
            throw new Error(`Category cannot exceed ${DataFieldValidator.#MAX_CATEGORY_LENGTH} characters`)
        }
    }
}