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

    /**
     * Configures security middleware.
     */
    #configureSecurityMiddleware() {
        // Use helmet for security headers
        this.#application.use(this.#securityHandler.getSecurityHeadersMiddleware())
        
        // Use express-rate-limit for rate limiting
        this.#application.use(this.#securityHandler.getRateLimitMiddleware())
    }

    /**
     * Configures body parsing middleware.
     */
    #configureBodyParsing() {
        this.#application.use(express.json())
        this.#application.use(express.urlencoded({ extended: true }))
    }

    /**
     * Configures static file serving.
     */
    #configureStaticFiles() {
        this.#application.use(express.static('src/public'))
    }

    /**
     * Configures application routes.
     */
    #configureRoutes() {
        const subscriptionRouter = new SubscriptionRouter()
        this.#application.use('/', subscriptionRouter.getRouter())
    }

    /**
     * Configures error handling middleware.
     */
    #configureErrorHandling() {
        this.#application.use((error, req, res, next) => 
            this.#errorHandler.handle(error, req, res, next))
    }

    /**
     * Returns the configured Express application.
     * 
     * @returns {object} Express application
     */
    getApplication() {
        return this.#application
    }
}