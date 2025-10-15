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
     * Returns middleware for security headers.
     * Uses Helmet library but abstracts implementation details.
     * 
     * @returns {Function} Security headers middleware
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
     * Returns rate limiting middleware.
     * 
     * @returns {Function} Rate limiting middleware
     */
    getRateLimitMiddleware() {
        return this.#rateLimiter
    }

    /**
     * Creates rate limiter middleware.
     * 
     * @returns {Function} Rate limiting middleware
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