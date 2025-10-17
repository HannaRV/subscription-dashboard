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
    #validator

    /**
     * Creates and configures the subscription router.
     * 
     * @param {SubscriptionController} subscriptionController - Controller instance (optional, creates new if not provided)
     * @param {SubscriptionValidation} validator - Validator instance (optional, creates new if not provided)
     */
    constructor(
        subscriptionController = new SubscriptionController(),
        validator = new SubscriptionValidation()
    ) {
        this.#router = express.Router()
        this.#subscriptionController = subscriptionController
        this.#validator = validator
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
            (req, res, next) => this.#validator.validateNewSubscription(req, res, next),
            (req, res) => this.#subscriptionController.addSubscription(req, res))

        // Remove subscription by name
        this.#router.post('/remove/:name',
            (req, res, next) => this.#validator.validateSubscriptionName(req, res, next),
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
