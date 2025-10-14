/**
 * @file Express application configuration and setup.
 * @module src/config/express.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SubscriptionRouter } from '../routes/SubscriptionRouter.js'
import { ErrorHandler } from '../middleware/ErrorHandler.js'
import { SecurityHandler } from '../middleware/SecurityHandler.js'

/**
 * Configures and manages the Express web server.
 */
export class WebServer {
    #expressApplication

    /**
     * Creates a new web server instance with all middleware configured.
     */
    constructor() {
        this.#expressApplication = express()
        this.#configureSecurityMiddleware()
        this.#configureBodyParsing()
        this.#configureStaticFiles()
        this.#configureRoutes()
        this.#configureErrorHandling()
    }

    #configureSecurityMiddleware() {
        this.#expressApplication.use(SecurityHandler.applySecurityHeaders)
        this.#expressApplication.use(SecurityHandler.rateLimit())
    }

    #configureBodyParsing() {
        this.#expressApplication.use(express.json())
        this.#expressApplication.use(express.urlencoded({ extended: true }))
        this.#expressApplication.use(SecurityHandler.sanitizeInput)
    }

    #configureStaticFiles() {
        this.#expressApplication.use(express.static('src/public'))
    }

    #configureRoutes() {
        const subscriptionRouter = new SubscriptionRouter()
        this.#expressApplication.use('/', subscriptionRouter.getRouter())
    }

    #configureErrorHandling() {
        this.#expressApplication.use(ErrorHandler.handle)
    }

    /**
     * Returns the configured Express application instance.
     * 
     * @returns {express.Application} The Express application
     */
    getApplication() {
        return this.#expressApplication
    }
}