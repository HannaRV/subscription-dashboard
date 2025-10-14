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
    #securityHandler
    #errorHandler

    /**
     * Creates a new web server instance with all middleware configured.
     */
    constructor() {
        this.#expressApplication = express()
        this.#securityHandler = new SecurityHandler()
        this.#errorHandler = new ErrorHandler()
        this.#configureSecurityMiddleware()
        this.#configureBodyParsing()
        this.#configureStaticFiles()
        this.#configureRoutes()
        this.#configureErrorHandling()
    }

    #configureSecurityMiddleware() {
        this.#expressApplication.use((req, res, next) => 
            this.#securityHandler.applySecurityHeaders(req, res, next))
        this.#expressApplication.use((req, res, next) => 
            this.#securityHandler.rateLimit(req, res, next))
    }

    #configureBodyParsing() {
        this.#expressApplication.use(express.json())
        this.#expressApplication.use(express.urlencoded({ extended: true }))
        this.#expressApplication.use((req, res, next) => 
            this.#securityHandler.sanitizeInput(req, res, next))
    }

    #configureStaticFiles() {
        this.#expressApplication.use(express.static('src/public'))
    }

    #configureRoutes() {
        const subscriptionRouter = new SubscriptionRouter()
        this.#expressApplication.use('/', subscriptionRouter.getRouter())
    }

    #configureErrorHandling() {
        this.#expressApplication.use((error, req, res, next) => 
            this.#errorHandler.handle(error, req, res, next))
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