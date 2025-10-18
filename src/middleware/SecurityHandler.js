/**
 * @file Security middleware using established libraries.
 * @module src/middleware/SecurityHandler.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

/**
 * Handles application security middleware.
 * Provides abstraction over third-party security libraries.
 */
export class SecurityHandler {
    #rateLimiter

    constructor() {
        this.#rateLimiter = this.#createRateLimiter()
    }

    /**
     * Returns Helmet middleware configured with CSP directives.
     * Abstracts Helmet implementation to allow easy replacement if needed.
     *
     * @returns {Function} Express middleware for security headers
     */
    getSecurityHeadersMiddleware() {
        return helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'"],
                    scriptSrc: ["'self'"]
                }
            }
        })
    }

    /**
     * @returns {Function} Express middleware for rate limiting
     */
    getRateLimitMiddleware() {
        return this.#rateLimiter
    }

    /**
     * Configures rate limiter: 100 requests per minute per IP.
     *
     * @returns {Function} Express rate limiting middleware
     */
    #createRateLimiter() {
        return rateLimit({
            windowMs: 60000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                error: 'Too Many Requests',
                message: 'Please try again later'
            }
        })
    }
}