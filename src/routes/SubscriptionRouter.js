/**
 * @file Main application router.
 * @module src/routes/router.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SubscriptionController } from '../controllers/SubscriptionController.js'

export class SubscriptionRouter {
    #router
    #subscriptionController

constructor() {
        this.#router = express.Router()
        this.#subscriptionController = new SubscriptionController()
        this.#configureRoutes()
    }
    #configureRoutes() {
        this.#router.get('/', (req, res) => this.#subscriptionController.displayDashboard(req, res))
        this.#router.post('/add', (req, res) => this.#subscriptionController.addSubscription(req, res))
        this.#router.post('/remove/:name', (req, res) => this.#subscriptionController.removeSubscription(req, res))
    }
    getRouter() {
        return this.#router
    }
}
