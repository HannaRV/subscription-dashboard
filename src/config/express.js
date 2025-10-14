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
 * Configures and manages the Express application.
 */
export class ExpressApplication {
    #application
    #securityHandler
    #errorHandler

    /**
     * Creates a new Express application instance with all middleware configured.
     */
    constructor() {
        this.#application = express()
        this.#securityHandler = new SecurityHandler()
        this.#errorHandler = new ErrorHandler()
        this.#configureSecurityMiddleware()
        this.#configureBodyParsing()
        this.#configureStaticFiles()
        this.#configureRoutes()
        this.#configureErrorHandling()
    }

    #configureSecurityMiddleware() {
        this.#application.use((req, res, next) => 
            this.#securityHandler.applySecurityHeaders(req, res, next))
        this.#application.use((req, res, next) => 
            this.#securityHandler.rateLimit(req, res, next))
    }

    #configureBodyParsing() {
        this.#application.use(express.json())
        this.#application.use(express.urlencoded({ extended: true }))
        this.#application.use((req, res, next) => 
            this.#securityHandler.sanitizeInput(req, res, next))
    }

    #configureStaticFiles() {
        this.#application.use(express.static('src/public'))
    }

    #configureRoutes() {
        const subscriptionRouter = new SubscriptionRouter()
        this.#application.use('/', subscriptionRouter.getRouter())
    }

    #configureErrorHandling() {
        this.#application.use((error, req, res, next) => 
            this.#errorHandler.handle(error, req, res, next))
    }

    /**
     * Returns the configured Express application instance.
     * 
     * @returns {express.Application} The Express application
     */
    getApplication() {
        return this.#application
    }
}