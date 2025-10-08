/**
 * @file Express application configuration and setup.
 * @module src/config/express.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { router } from '../routes/router.js'

export class ApplicationServer {
    #expressApplication

    constructor() {
        this.#expressApplication = express()
        this.#configureMiddleware()
        this.#configureStaticFiles()
        this.#configureRoutes()
    }

    #configureMiddleware() {
        this.#expressApplication.use(express.json())
        this.#expressApplication.use(express.urlencoded({ extended: true }))
    }

    #configureStaticFiles() {
        this.#expressApplication.use(express.static('src/public'))
    }

    #configureRoutes() {
        this.#expressApplication.use('/', router)
    }

    getApplication() {
        return this.#expressApplication
    }
}