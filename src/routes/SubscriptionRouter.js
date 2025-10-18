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
     * @param {SubscriptionController} [subscriptionController] - Injected for testing
     * @param {SubscriptionValidation} [validator] - Injected for testing
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

        this.#router.get('/', (req, res) =>
            this.#subscriptionController.displayDashboard(req, res))

        this.#router.get('/api/subscriptions', (req, res) =>
            this.#subscriptionController.getSubscriptionsData(req, res))

        this.#router.post('/add',
            (req, res, next) => this.#validator.validateNewSubscription(req, res, next),
            (req, res) => this.#subscriptionController.addSubscription(req, res))

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
