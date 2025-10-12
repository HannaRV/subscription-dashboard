/**
 * @file Frontend JavaScript for subscription dashboard.
 * @module src/public/js/main.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { API, CSS_CLASSES, DOM_IDS, MESSAGES } from './config.js'

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

        const info = this.createInfoSection(subscription)
        const price = this.createPriceElement(subscription.price)
        const removeBtn = this.createRemoveButton(subscription.name)

        div.appendChild(info)
        div.appendChild(price)
        div.appendChild(removeBtn)

        return div
    }

    /**
     * Creates info section for subscription.
     * 
     * @param {Object} subscription - Subscription data
     * @returns {HTMLElement} Info element
     */
    static createInfoSection(subscription) {
        const info = document.createElement('div')
        info.className = CSS_CLASSES.SUBSCRIPTION_INFO

        const name = document.createElement('div')
        name.className = CSS_CLASSES.SUBSCRIPTION_NAME
        name.textContent = subscription.name

        const details = document.createElement('div')
        details.className = CSS_CLASSES.SUBSCRIPTION_DETAILS
        details.textContent = `${subscription.category} • ${subscription.frequency}`

        info.appendChild(name)
        info.appendChild(details)

        return info
    }

    /**
     * Creates price display element.
     * 
     * @param {number} price - Price amount
     * @returns {HTMLElement} Price element
     */
    static createPriceElement(price) {
        const priceDiv = document.createElement('div')
        priceDiv.className = CSS_CLASSES.SUBSCRIPTION_PRICE
        priceDiv.textContent = `${price} kr`
        return priceDiv
    }

    /**
     * Creates remove button form.
     * 
     * @param {string} name - Subscription name
     * @returns {HTMLElement} Form with button
     */
    static createRemoveButton(name) {
        const form = document.createElement('form')
        form.action = `${API.REMOVE_URL}/${encodeURIComponent(name)}`
        form.method = 'POST'
        form.style.display = 'inline'

        const button = document.createElement('button')
        button.type = 'submit'
        button.className = CSS_CLASSES.REMOVE_BTN
        button.textContent = 'Remove'


        form.appendChild(button)
        return form
    }

    /**
     * Creates empty state message element.
     * 
     * @returns {HTMLElement} Empty state element
     */
    static createEmptyState() {
        const empty = document.createElement('div')
        empty.className = CSS_CLASSES.EMPTY_STATE
        empty.textContent = MESSAGES.EMPTY_STATE
        return empty
    }

    /**
     * Creates error message element.
     * 
     * @param {string} message - Error message
     * @returns {HTMLElement} Error element
     */
    static createErrorElement(message) {
        const errorDiv = document.createElement('div')
        errorDiv.className = CSS_CLASSES.EMPTY_STATE
        errorDiv.classList.add('error')
        errorDiv.textContent = message
        return errorDiv
    }
}

/**
 * Handles subscription UI rendering and view management.
 */
class SubscriptionView {
    #listContainer
    #totalCostElement

    /**
     * Creates a new subscription view.
     * 
     * @param {string} listContainerId - ID of subscriptions list container
     * @param {string} totalCostId - ID of total cost element
     */
    constructor(listContainerId, totalCostId) {
        this.#listContainer = document.getElementById(listContainerId)
        this.#totalCostElement = document.getElementById(totalCostId)
    }

    /**
     * Renders subscription list.
     * 
     * @param {Array} subscriptions - Array of subscription objects
     */
    renderSubscriptions(subscriptions) {
        this.#clearContainer()

        if (subscriptions.length === 0) {
            this.#showEmptyState()
            return
        }

        subscriptions.forEach(subscription => {
            const element = SubscriptionElementFactory.createSubscriptionElement(subscription)
            this.#listContainer.appendChild(element)
        })
    }

    /**
     * Updates total cost display.
     * 
     * @param {number} cost - Total monthly cost
     */
    updateTotalCost(cost) {
        this.#totalCostElement.textContent = cost
    }

    /**
     * Shows error message to user.
     * 
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.#clearContainer()
        const errorDiv = SubscriptionElementFactory.createErrorElement(message)
        this.#listContainer.appendChild(errorDiv)
    }

    #showEmptyState() {
        const empty = SubscriptionElementFactory.createEmptyState()
        this.#listContainer.appendChild(empty)
    }

    #clearContainer() {
        while (this.#listContainer.firstChild) {
            this.#listContainer.removeChild(this.#listContainer.firstChild)
        }
    }
}
