/**
 * @file Security middleware.
 * @module src/middleware/SecurityHandler.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'

/**
 * Handles application security middleware.
 */
export class SecurityHandler {
    #rateLimiter
    #inputSanitizer

    constructor() {
        this.#rateLimiter = new RateLimiter()
        this.#inputSanitizer = new InputSanitizer()
    }

    /**
     * Applies security headers to response.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    applySecurityHeaders(req, res, next) {
        SecurityHeaders.apply(res)
        next()
    }

    /**
     * Rate limiting middleware.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    rateLimit(req, res, next) {
        this.#rateLimiter.check(req, res, next)
    }

    /**
     * Sanitizes user input.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    sanitizeInput(req, res, next) {
        try {
            this.#inputSanitizer.sanitize(req)
            next()
        } catch (error) {
            next(error)
        }
    }
}

/**
 * Applies security headers to HTTP responses.
 */
class SecurityHeaders {
    /**
     * Applies all security headers.
     * 
     * @param {object} res - Express response object
     */
    static apply(res) {
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('X-Frame-Options', 'DENY')
        res.setHeader('X-XSS-Protection', '1; mode=block')
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        res.setHeader('Content-Security-Policy', "default-src 'self'; style-src 'self'; script-src 'self'")
        res.setHeader('Referrer-Policy', 'no-referrer')
    }
}

/**
 * Implements rate limiting per client IP.
 */
class RateLimiter {
    static #ONE_MINUTE_MS = 60000
    static #MAX_REQUESTS_PER_MINUTE = 100
    static #CLEANUP_PROBABILITY = 0.01

    #requests = new Map()

    /**
     * Checks if client has exceeded rate limit.
     * 
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    check(req, res, next) {
        const clientIp = req.ip
        const now = Date.now()

        if (this.#clientExceededRateLimit(clientIp, now)) {
            return this.#sendRateLimitError(res)
        }

        this.#recordClientRequest(clientIp, now)
        this.#occasionallyCleanupOldRequests(now)
        next()
    }

    #clientExceededRateLimit(ip, now) {
        const requests = this.#getClientRequests(ip)
        const recent = requests.filter(time => this.#isRecentRequest(time, now))
        return recent.length >= RateLimiter.#MAX_REQUESTS_PER_MINUTE
    }

    #sendRateLimitError(res) {
        res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
            error: 'Too Many Requests',
            message: 'Please try again later'
        })
    }

    #getClientRequests(ip) {
        if (!this.#requests.has(ip)) {
            this.#requests.set(ip, [])
        }
        return this.#requests.get(ip)
    }

    #isRecentRequest(requestTime, now) {
        return now - requestTime < RateLimiter.#ONE_MINUTE_MS
    }

    #recordClientRequest(ip, now) {
        const requests = this.#getClientRequests(ip)
        const recent = requests.filter(time => this.#isRecentRequest(time, now))
        recent.push(now)
        this.#requests.set(ip, recent)
    }

    #occasionallyCleanupOldRequests(now) {
        if (this.#shouldRunCleanup()) {
            this.#cleanupOldRequests(now)
        }
    }

    #shouldRunCleanup() {
        return Math.random() < RateLimiter.#CLEANUP_PROBABILITY
    }

    #cleanupOldRequests(now) {
        for (const [ip, times] of this.#requests.entries()) {
            const recent = times.filter(time => this.#isRecentRequest(time, now))

            if (recent.length === 0) {
                this.#requests.delete(ip)
            } else {
                this.#requests.set(ip, recent)
            }
        }
    }
}

/**
 * Sanitizes user input to prevent XSS attacks.
 */
class InputSanitizer {
    /**
     * Sanitizes request body strings.
     * 
     * @param {object} req - Express request object
     */
    sanitize(req) {
        if (!req.body) return

        for (let key in req.body) {
            if (this.#isString(req.body[key])) {
                req.body[key] = this.#sanitizeString(req.body[key])
            }
        }
    }

    #isString(value) {
        return typeof value === 'string'
    }

    #sanitizeString(str) {
        return this.#removeHtmlTags(str).trim()
    }

    #removeHtmlTags(str) {
        return str
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    }
}