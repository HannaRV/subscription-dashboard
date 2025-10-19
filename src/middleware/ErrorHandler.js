/**
 * @file Centralized error handling.
 * @module src/middleware/ErrorHandler.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'

/**
 * Main error handler for the application.
 */
export class ErrorHandler {
    #logger
    #classifier
    #responder

    constructor() {
        this.#logger = new ErrorLogger()
        this.#classifier = new ErrorClassifier()
        this.#responder = new ErrorResponder()
    }

    /**
     * Handles all application errors.
     *
     * @param {Error} error - Error object
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     * @param {Function} next - Express next middleware function
     */
    handle(error, req, res, next) {
        if (res.headersSent) {
            return next(error)
        }
        this.#logger.log(error, req)
        const errorResponse = this.#classifier.classify(error)
        this.#responder.respond(res, errorResponse)
    }
}

/**
 * Logs error details to console with stack trace in development mode.
 */
class ErrorLogger {
    /**
     * @param {Error} error - Error object
     * @param {object} req - Express request object
     */
    log(error, req) {
        console.error('Error occurred:', {
            message: error.message,
            stack: this.#isDevelopment() ? error.stack : undefined,
            path: req.path,
            method: req.method,
            timestamp: new Date().toISOString()
        })
    }

    #isDevelopment() {
        return process.env.NODE_ENV === 'development'
    }
}

/**
 * Classifies errors into appropriate HTTP responses based on error message patterns.
 */
class ErrorClassifier {
    #ERROR_TYPE_VALIDATION = 'Validation Error'
    #ERROR_TYPE_NOT_FOUND = 'Not Found'
    #ERROR_TYPE_INTERNAL = 'Internal Server Error'
    #VALIDATION_KEYWORDS = ['must be', 'cannot be', 'is required', 'invalid']
    #NOT_FOUND_KEYWORD = 'not found'

    /**
     * Classifies an error by analyzing its message and returns appropriate HTTP response details.
     *
     * @param {Error} error - Error object
     * @returns {object} Response with { status: number, type: string, message: string }
     */
    classify(error) {
        if (this.#isValidationError(error)) {
            return {
                status: HTTP_STATUS.BAD_REQUEST,
                type: this.#ERROR_TYPE_VALIDATION,
                message: error.message
            }
        }

        if (this.#isNotFoundError(error)) {
            return {
                status: HTTP_STATUS.NOT_FOUND,
                type: this.#ERROR_TYPE_NOT_FOUND,
                message: error.message
            }
        }

        return {
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            type: this.#ERROR_TYPE_INTERNAL,
            message: this.#isProduction() ? 'Something went wrong' : error.message
        }
    }

    #isValidationError(error) {
        const message = error.message.toLowerCase()
        return this.#VALIDATION_KEYWORDS.some(keyword => message.includes(keyword))
    }

    #isNotFoundError(error) {
        const message = error.message.toLowerCase()
        return message.includes(this.#NOT_FOUND_KEYWORD)
    }

    #isProduction() {
        return process.env.NODE_ENV === 'production'
    }
}

/**
 * Sends error responses to client.
 */
class ErrorResponder {
    /**
     * @param {object} res - Express response object
     * @param {object} errorResponse - { status, type, message }
     */
    respond(res, errorResponse) {
        res.status(errorResponse.status).json({
            error: errorResponse.type,
            message: errorResponse.message
        })
    }
}
