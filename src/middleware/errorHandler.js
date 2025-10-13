/**
 * @file Centralized error handling.
 * @module src/middleware/errorHandler.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { HTTP_STATUS } from '../config/httpStatus.js'

export class ErrorHandler {
    static handle(error, req, res, next) {
        ErrorLogger.log(error, req)
        const errorResponse = ErrorClassifier.classify(error)
        ErrorResponder.respond(res, errorResponse)
    }
}

class ErrorLogger {
    static log(error, req) {
        console.error('Error occurred:', {
            message: error.message,
            stack: this.#isDevelopment() ? error.stack : undefined,
            path: req.path,
            method: req.method,
            timestamp: new Date().toISOString()
        })
    }

    static #isDevelopment() {
        return process.env.NODE_ENV === 'development'
    }
}

class ErrorClassifier {
    static #ERROR_TYPE_VALIDATION = 'Validation Error'
    static #ERROR_TYPE_NOT_FOUND = 'Not Found'
    static #ERROR_TYPE_INTERNAL = 'Internal Server Error'

    static #VALIDATION_KEYWORDS = ['must be', 'cannot be', 'is required', 'invalid']
    static #NOT_FOUND_KEYWORD = 'not found'

    static classify(error) {
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

    static #isValidationError(error) {
        const message = error.message.toLowerCase()
        return this.#VALIDATION_KEYWORDS.some(keyword => message.includes(keyword))
    }

    static #isNotFoundError(error) {
        const message = error.message.toLowerCase()
        return error.message.toLowerCase().includes(this.#NOT_FOUND_KEYWORD)
    }

    static #isProduction() {
        return process.env.NODE_ENV === 'production'
    }
}

class ErrorResponder {
    static respond(res, errorResponse) {
        res.status(errorResponse.status).json({
            error: errorResponse.type,
            message: errorResponse.message
        })
    }
}