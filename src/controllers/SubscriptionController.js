/**
 * @file Controller for handling subscription requests.
 * @module src/controllers/SubscriptionController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { SubscriptionRepository } from '../models/SubscriptionRepository.js'
import { HTTP_STATUS } from '../config/httpStatus.js'


/**
 * Coordinates subscription operations between HTTP layer and data repository.
 */
export class SubscriptionController {
    #repository

    /**
     * @param {SubscriptionRepository} [repository] - Injected for testing, creates new instance if omitted
     */
    constructor(repository = new SubscriptionRepository()) {
        this.#repository = repository
    }

    displayDashboard(req, res) {
        res.sendFile('index.html', { root: 'src/views' })
    }

    /**
     * Returns subscriptions converted to requested frequency.
     * 
     * @param {object} req.query.view - 'weekly' | 'monthly' | 'yearly' (default: 'monthly')
     */
    getSubscriptionsData(req, res) {
        try {
            const viewFrequency = req.query.view || 'monthly'

            const subscriptions = this.#repository.getAllSubscriptionsAsPlainObjects(viewFrequency)
            const totalCost = this.#repository.getTotalCost(viewFrequency)

            res.json({
                subscriptions,
                totalCost,
                viewFrequency
            })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: 'Internal Server Error',
                message: error.message
            })
        }
    }

    /**
     * Adds a new subscription from form data.
     * 
     * @param {object} req.body - { name, price, frequency, category }
     */
    addSubscription(req, res) {
        const { name, price, frequency, category } = req.body
        try {
            this.#repository.addSubscription(name, Number(price), frequency, category)
            res.redirect('/')
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: 'Validation Error',
                message: error.message
            })
        }
    }

    /**
     * Removes subscription by name from URL parameter.
     *
     * @param {string} req.params.name - URL-encoded subscription name
     */
    removeSubscription(req, res) {
        const { name } = req.params

        try {
            const removed = this.#repository.removeSubscriptionByName(name)
            if (removed) {
                res.redirect('/')
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).json({
                    error: 'Not Found',
                    message: 'Subscription not found'
                })
            }
        } catch (error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                error: 'Validation Error',
                message: error.message
            })
        }
    }
}

