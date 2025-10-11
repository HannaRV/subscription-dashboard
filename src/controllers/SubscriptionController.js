/**
 * @file Controller for handling subscription requests.
 * @module src/controllers/SubscriptionController.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { SubscriptionRepository } from '../models/SubscriptionRepository.js'

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
        const subscriptions = this.#repository.getAllSubscriptions()
        const totalCost = this.#repository.getTotalMonthlyCost()

        res.json({
            subscriptions,
            totalMonthlyCost: totalCost
        })
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
            res.status(400).json({ error: error.message })
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
                res.redirect('/')
            } else {
                res.status(404).json({ error: 'Subscription not found' })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}
