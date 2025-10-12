/**
 * @file Application configuration constants.
 * 
 * This file contains all configuration constants for the frontend application.
 * Separated from business logic to maintain Single Responsibility Principle.
 * 
 * @module src/public/js/config.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

/**
 * API endpoint configuration.
 */
export const API = {
    BASE_URL: '/api/subscriptions',
    REMOVE_URL: '/remove'
}

/**
 * CSS class name constants.
 */
export const CSS_CLASSES = {
    SUBSCRIPTION_ITEM: 'subscription-item',
    SUBSCRIPTION_INFO: 'subscription-info',
    SUBSCRIPTION_NAME: 'subscription-name',
    SUBSCRIPTION_DETAILS: 'subscription-details',
    SUBSCRIPTION_PRICE: 'subscription-price',
    REMOVE_BTN: 'remove-btn',
    EMPTY_STATE: 'empty-state'
}

/**
 * DOM element ID constants.
 */
export const DOM_IDS = {
    SUBSCRIPTIONS_LIST: 'subscriptions-list',
    TOTAL_COST: 'total-cost'
}

/**
 * User-facing message constants.
 */
export const MESSAGES = {
    EMPTY_STATE: 'No subscriptions yet. Add your first one!',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    LOAD_ERROR: 'Failed to load subscriptions. Please refresh the page.',
    FETCH_ERROR: 'Failed to fetch subscriptions'
}
