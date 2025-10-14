/**
 * @file Controller for handling subscription requests.
 * @module src/controllers/SubscriptionController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { SubscriptionRepository } from '../models/SubscriptionRepository.js'
import { HTTP_STATUS } from '../config/httpStatus.js'

/**
 * Handles HTTP requests for subscription management.
 */
export class SubscriptionController {
    #repository

    /**
     * Creates a new subscription controller.
     * 
     * @param {SubscriptionRepository} repository - Repository instance (optional, creates new if not provided)
     */
    constructor(repository = new SubscriptionRepository()) {
        this.#repository = repository
    }

    /**
     * Displays the main dashboard with all subscriptions.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    displayDashboard(req, res) {
        res.sendFile('index.html', { root: 'src/views' })
    }

    /**
    * Gets subscription data as JSON for API.
    * 
    * @param {object} req - Express request object
    * @param {object} res - Express response object
    */
    getSubscriptionsData(req, res) {
        try {
            const subscriptions = this.#repository.getAllSubscriptions()
            const totalCost = this.#repository.getTotalMonthlyCost()

            res.json({
                subscriptions,
                totalMonthlyCost: totalCost
            })
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                error: 'Internal Server Error',
                message: error.message
            })
        }
    }

    /**
     * Adds a new subscription.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
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
     * Removes a subscription by name.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    removeSubscription(req, res) {
        const { name } = req.params

        try {
            const removed = this.#repository.removeSubscriptionByName(name)
            if (removed) {
                res.redirect('/')  // ✅ Byt tillbaka till redirect
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

