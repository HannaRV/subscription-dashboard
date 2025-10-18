/**
 * @file Frontend JavaScript for subscription dashboard.
 * @module src/public/js/main.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { API_ENDPOINTS, CSS_CLASSES, USER_MESSAGES, DEFAULT_VIEW_FREQUENCY } from './config.js'

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
     * @param {string} [viewFrequency='monthly'] - 'weekly' | 'monthly' | 'yearly'
     * @returns {Promise<Object>} { subscriptions: Array, totalCost: number, viewFrequency: string }
     * @throws {Error} If fetch fails or network error occurs
     */
    async fetchSubscriptions(viewFrequency = DEFAULT_VIEW_FREQUENCY) {
        try {
            const response = await fetch(`${this.#baseUrl}?view=${viewFrequency}`)

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
      * @param {Object} subscription - Subscription data
      * @param {string} viewFrequency - Display frequency
      * @returns {HTMLElement} Complete subscription item with info, price, and remove button
      */
    createSubscriptionElement(subscription, viewFrequency) {
        const containerDiv = document.createElement('div')
        containerDiv.className = CSS_CLASSES.SUBSCRIPTION_ITEM

        const infoSection = this.createInfoSection(subscription)
        const priceDiv = this.createPriceElement(subscription.displayCost, viewFrequency)
        const removeForm = this.createRemoveForm(subscription.name)

        containerDiv.appendChild(infoSection)
        containerDiv.appendChild(priceDiv)
        containerDiv.appendChild(removeForm)

        return containerDiv
    }

    /**
     * @param {Object} subscription - { name, category, originalFrequency, originalPrice }
     * @returns {HTMLElement} Info section with name and details
     */
    createInfoSection(subscription) {
        const infoDiv = document.createElement('div')
        infoDiv.className = CSS_CLASSES.SUBSCRIPTION_INFO

        const nameDiv = document.createElement('div')
        nameDiv.className = CSS_CLASSES.SUBSCRIPTION_NAME
        nameDiv.textContent = subscription.name

        const detailsDiv = document.createElement('div')
        detailsDiv.className = CSS_CLASSES.SUBSCRIPTION_DETAILS
        detailsDiv.textContent = `${subscription.category} • ${subscription.originalFrequency} • ${subscription.originalPrice}kr`

        infoDiv.appendChild(nameDiv)
        infoDiv.appendChild(detailsDiv)

        return infoDiv
    }

    /**
     * @param {number} displayCost - Cost to display
     * @param {string} viewFrequency - 'weekly' | 'monthly' | 'yearly'
     * @returns {HTMLElement} Formatted price element
     */
    createPriceElement(displayCost, viewFrequency) {
        const priceDiv = document.createElement('div')
        priceDiv.className = CSS_CLASSES.SUBSCRIPTION_PRICE
        priceDiv.textContent = `${displayCost.toFixed(2)} kr/${viewFrequency}`
        return priceDiv
    }

    /**
     * @param {string} name - Subscription name to remove
     * @returns {HTMLElement} Form with remove button
     */
    createRemoveForm(name) {
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
     * @returns {HTMLElement} Empty state message element
     */
    createEmptyState() {
        const emptyDiv = document.createElement('div')
        emptyDiv.className = CSS_CLASSES.EMPTY_STATE
        emptyDiv.textContent = USER_MESSAGES.EMPTY_STATE
        return emptyDiv
    }

    /**
     * @param {string} message - Error message to display
     * @returns {HTMLElement} Error message element
     */
    createErrorElement(message) {
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
    #totalCostDisplay
    #elementFactory

    /**
     * Initializes view with DOM element references.
     */
    constructor() {
        const LIST_CONTAINER_ID = 'subscriptions-list'
        const TOTAL_COST_DISPLAY_ID = 'total-cost-display'

        this.#listContainer = document.getElementById(LIST_CONTAINER_ID)
        this.#totalCostDisplay = document.getElementById(TOTAL_COST_DISPLAY_ID)
        this.#elementFactory = new SubscriptionElementFactory()
    }

    /**
     * @param {Array<Object>} subscriptions - Subscription objects to render
     * @param {string} viewFrequency - Display frequency for prices
     */
    renderSubscriptions(subscriptions, viewFrequency) {
        this.#clearContainer()

        if (subscriptions.length === 0) {
            this.#showEmptyState()
            return
        }

        subscriptions.forEach(subscription => {
            const element = this.#elementFactory.createSubscriptionElement(subscription, viewFrequency)
            this.#listContainer.appendChild(element)
        })
    }

    /**
     * @param {number} cost - Total cost to display
     * @param {string} viewFrequency - 'weekly' | 'monthly' | 'yearly'
     */
    updateTotalCost(cost, viewFrequency) {
        this.#totalCostDisplay.textContent = `Total ${viewFrequency} cost: ${cost.toFixed(2)} kr`
    }

    /**
     * @param {string} message - Error message to display
     */
    showError(message) {
        this.#clearContainer()
        const errorDiv = this.#elementFactory.createErrorElement(message)
        this.#listContainer.appendChild(errorDiv)
    }

    #showEmptyState() {
        const emptyDiv = this.#elementFactory.createEmptyState()
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
        this.#view = new SubscriptionView()
    }

    /**
     * Loads initial subscriptions and sets up frequency selector event listener.
     */
    async initialize() {
        try {
            await this.loadSubscriptions(DEFAULT_VIEW_FREQUENCY)

            const frequencySelect = document.getElementById('view-frequency')
            if (frequencySelect) {
                frequencySelect.addEventListener('change', async (event) => {
                    await this.loadSubscriptions(event.target.value)
                })
            }
        } catch (error) {
            console.error('Failed to initialize app:', error)
            this.#view.showError(error.message)
        }
    }

    /**
     * @param {string} viewFrequency - 'weekly' | 'monthly' | 'yearly'
     */
    async loadSubscriptions(viewFrequency) {
        try {
            const data = await this.#api.fetchSubscriptions(viewFrequency)
            this.#view.renderSubscriptions(data.subscriptions, data.viewFrequency)
            this.#view.updateTotalCost(data.totalCost, data.viewFrequency)
        } catch (error) {
            console.error('Failed to load subscriptions:', error)
            this.#view.showError(error.message)
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new SubscriptionApp()
    app.initialize()
})