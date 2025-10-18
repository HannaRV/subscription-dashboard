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
 * Configures and creates the Express application.
 */
export class ExpressApplication {
    #application
    #securityHandler
    #errorHandler

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
        // Use helmet for security headers
        this.#application.use(this.#securityHandler.getSecurityHeadersMiddleware())
        
        // Use express-rate-limit for rate limiting
        this.#application.use(this.#securityHandler.getRateLimitMiddleware())
    }

    #configureBodyParsing() {
        this.#application.use(express.json())
        this.#application.use(express.urlencoded({ extended: true }))
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
     * Returns the configured Express application.
     *
     * @returns {express.Application} Express application instance
     */
    getApplication() {
        return this.#application
    }
}