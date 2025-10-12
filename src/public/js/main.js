/**
 * @file Frontend JavaScript for subscription dashboard.
 * @module src/public/js/main.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { API_ENDPOINTS, CSS_CLASSES, DOM_ELEMENT_IDS, USER_MESSAGES } from './config.js'

/**
 * Handles API communication for subscriptions.
 */
class SubscriptionAPI {
    #baseUrl

    constructor(baseUrl = API_ENDPOINTS.GET_SUBSCRIPTIONS) {
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
                throw new Error(`${USER_MESSAGES.FETCH_ERROR}: ${response.status}`)
            }

            return await response.json()
        } catch (error) {
            if (error.name === 'TypeError') {
                throw new Error(USER_MESSAGES.NETWORK_ERROR)
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
        const containerDiv = document.createElement('div')
        containerDiv.className = CSS_CLASSES.SUBSCRIPTION_ITEM

        const infoSection = this.createInfoSection(subscription)
        const priceDiv = this.createPriceElement(subscription.price)
        const removeForm = this.createRemoveForm(subscription.name)

        containerDiv.appendChild(infoSection)
        containerDiv.appendChild(priceDiv)
        containerDiv.appendChild(removeForm)

        return containerDiv
    }

    /**
     * Creates info section for subscription.
     * 
     * @param {Object} subscription - Subscription data
     * @returns {HTMLElement} Info element
     */
    static createInfoSection(subscription) {
        const infoDiv = document.createElement('div')
        infoDiv.className = CSS_CLASSES.SUBSCRIPTION_INFO

        const nameDiv = document.createElement('div')
        nameDiv.className = CSS_CLASSES.SUBSCRIPTION_NAME
        nameDiv.textContent = subscription.name

        const detailsDiv = document.createElement('div')
        detailsDiv.className = CSS_CLASSES.SUBSCRIPTION_DETAILS
        detailsDiv.textContent = `${subscription.category} • ${subscription.frequency}`

        infoDiv.appendChild(nameDiv)
        infoDiv.appendChild(detailsDiv)

        return infoDiv
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
     * @returns {HTMLElement} Form with remove button
     */
    static createRemoveForm(name) {
        const removeForm = document.createElement('form')
        removeForm.action = `${API_ENDPOINTS.REMOVE_SUBSCRIPTION}/${encodeURIComponent(name)}`
        removeForm.method = 'POST'
        removeForm.style.display = 'inline'

        const removeButton = document.createElement('button')
        removeButton.type = 'submit'
        removeButton.className = CSS_CLASSES.REMOVE_BUTTON
        removeButton.textContent = 'Remove'


        removeForm.appendChild(removeButton)
        return removeForm
    }

    /**
     * Creates empty state message element.
     * 
     * @returns {HTMLElement} Empty state element
     */
    static createEmptyState() {
        const emptyDiv = document.createElement('div')
        emptyDiv.className = CSS_CLASSES.EMPTY_STATE
        emptyDiv.textContent = USER_MESSAGES.EMPTY_STATE
        return emptyDiv
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
        const emptyDiv = SubscriptionElementFactory.createEmptyState()
        this.#listContainer.appendChild(emptyDiv)
    }

    #clearContainer() {
        while (this.#listContainer.firstChild) {
            this.#listContainer.removeChild(this.#listContainer.firstChild)
        }
    }
}

/**
 * Main application controller that coordinates API and View.
 */
class SubscriptionApp {
    #api
    #view

    constructor() {
        this.#api = new SubscriptionAPI()
        this.#view = new SubscriptionView(DOM_ELEMENT_IDS.SUBSCRIPTIONS_LIST_CONTAINER, DOM_ELEMENT_IDS.TOTAL_COST_DISPLAY)
    }

    /**
     * Initializes the application by loading subscriptions.
     */
    async initialize() {
        try {
            const data = await this.#api.fetchSubscriptions()
            this.#view.renderSubscriptions(data.subscriptions)
            this.#view.updateTotalCost(data.totalMonthlyCost)
        } catch (error) {
            console.error('Failed to initialize app:', error)
            this.#view.showError(error.message)
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new SubscriptionApp()
    app.initialize()
})