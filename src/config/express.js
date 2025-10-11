/**
 * @file Express application configuration and setup.
 * @module src/config/express.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SubscriptionRouter } from '../routes/SubscriptionRouter.js'

/**
 * Represents the web server with Express configuration.
 */
export class WebServer {
    #expressApplication

    /**
     * Creates a new web server instance with configured Express.
     */
    constructor() {
        this.#expressApplication = express()
        this.#configureMiddleware()
        this.#configureStaticFiles()
        this.#configureRoutes()
    }

    /**
     * Configures Express middleware for parsing requests.
     */
    #configureMiddleware() {
        this.#expressApplication.use(express.json())
        this.#expressApplication.use(express.urlencoded({ extended: true }))
    }
    /**
     * Configures static file serving from public directory.
     */
    #configureStaticFiles() {
        this.#expressApplication.use(express.static('src/public'))
    }

    /**
     * Configures application routes.
     */
    #configureRoutes() {
        const subscriptionRouter = new SubscriptionRouter()
        this.#expressApplication.use('/', subscriptionRouter.getRouter())
    }

    /**
     * Returns the configured Express application instance.
     * 
     * @returns {express.Application} Express application instance
     */
    getApplication() {
        return this.#expressApplication
    }
}