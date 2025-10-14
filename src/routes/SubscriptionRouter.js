/**
 * @file Main application router.
 * @module src/routes/SubscriptionRouter.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SubscriptionController } from '../controllers/SubscriptionController.js'
import { SubscriptionValidation } from '../middleware/SubscriptionValidation.js'

/**
 * Manages routes for subscription operations.
 */
export class SubscriptionRouter {
    #router
    #subscriptionController

    /**
     * Creates and configures the subscription router.
     */
    constructor() {
        this.#router = express.Router()
        this.#subscriptionController = new SubscriptionController()
        this.#configureRoutes()
    }

    /**
     * Configures all subscription-related routes.
     */
    #configureRoutes() {
        // Serve HTML dashboard
        this.#router.get('/', (req, res) =>
            this.#subscriptionController.displayDashboard(req, res))

        // API endpoint for subscription data
        this.#router.get('/api/subscriptions', (req, res) =>
            this.#subscriptionController.getSubscriptionsData(req, res))

        // Add subscription
        this.#router.post('/add',
            SubscriptionValidation.validateNewSubscription,
            (req, res) => this.#subscriptionController.addSubscription(req, res))

        // Remove subscription by name
        this.#router.post('/remove/:name',
            SubscriptionValidation.validateSubscriptionName,
            (req, res) => this.#subscriptionController.removeSubscription(req, res))
    }

    /**
     * Returns the configured Express router.
     * 
     * @returns {express.Router} Express router instance
     */
    getRouter() {
        return this.#router
    }
}
