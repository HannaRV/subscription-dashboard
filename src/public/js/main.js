/**
 * @file Frontend JavaScript for subscription dashboard.
 * @module src/public/js/main.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { API, CSS_CLASSES, DOM_IDS, MESSAGES } from './config.js';

/**
 * Handles API communication for subscriptions.
 */
class SubscriptionAPI {
    #baseUrl

    constructor(baseUrl = API.BASE_URL) {
        this.#baseUrl = baseUrl
    }

    /**
     * Fetches all subscriptions from the server.
     * 
     * @returns {Promise<Object>} Subscription data with subscriptions array and total cost
     * @throws {Error} If fetch fails or network error occurs
     */
    async fetchSubscriptions() {
        try {
            const response = await fetch(this.#baseUrl)

            if (!response.ok) {
                throw new Error(`${MESSAGES.FETCH_ERROR}: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error(MESSAGES.NETWORK_ERROR)
            }
            throw error
        }
    }
}

/**
 * Factory for creating subscription DOM elements.
 */
class SubscriptionElementFactory {
    /**
        * Creates a complete subscription element.
        * 
        * @param {Object} subscription - Subscription data
        * @returns {HTMLElement} Subscription element
        */
    static createSubscriptionElement(subscription) {
        const div = document.createElement('div')
        div.className = CSS_CLASSES.SUBSCRIPTION_ITEM

        const info = this.createInfoElement(subscription)
        const price = this.createPriceElement(subscription.price)
        const removeBtn = this.createRemoveButton(subscription.name)

        div.appendChild(info)
        div.appendChild(price)
        div.appendChild(removeBtn)

        return div
    }
}
