/**
 * @file Frontend JavaScript for subscription dashboard.
 * @module src/public/js/main.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { API_ENDPOINTS, CSS_CLASSES, USER_MESSAGES } from './config.js'

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
     * @param {string} viewFrequency - Frequency to view costs (weekly, monthly, yearly)
     * @returns {Promise<Object>} Subscription data with subscriptions array and total cost
     * @throws {Error} If fetch fails or network error occurs
     */
    async fetchSubscriptions(viewFrequency = 'monthly') {
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
     * Creates a complete subscription element.
     * 
     * @param {Object} subscription - Subscription data
     * @returns {HTMLElement} Subscription element
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
     * Creates info section for subscription.
     * 
     * @param {Object} subscription - Subscription data
     * @returns {HTMLElement} Info element
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
     * Creates price display element.
     * 
     * @param {number} displayCost - Cost to display
     * @param {string} viewFrequency - Frequency label (weekly, monthly, yearly)
     * @returns {HTMLElement} Price element
     */
    createPriceElement(displayCost, viewFrequency) {
        const priceDiv = document.createElement('div')
        priceDiv.className = CSS_CLASSES.SUBSCRIPTION_PRICE
        priceDiv.textContent = `${displayCost.toFixed(2)} kr/${viewFrequency}`
        return priceDiv
    }

    /**
     * Creates remove button form.
     * 
     * @param {string} name - Subscription name
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
     * Creates empty state message element.
     * 
     * @returns {HTMLElement} Empty state element
     */
    createEmptyState() {
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
     * Creates a new subscription view with default DOM element IDs.
     */
    constructor() {
        const LIST_CONTAINER_ID = 'subscriptions-list'
        const TOTAL_COST_DISPLAY_ID = 'total-cost-display'

        this.#listContainer = document.getElementById(LIST_CONTAINER_ID)
        this.#totalCostDisplay = document.getElementById(TOTAL_COST_DISPLAY_ID)
        this.#elementFactory = new SubscriptionElementFactory()
    }

    /**
     * Renders subscription list.
     * 
     * @param {Array} subscriptions - Array of subscription objects
     * @param {string} viewFrequency - Frequency to display
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
     * Updates total cost display.
     * 
     * @param {number} cost - Total cost
     * @param {string} viewFrequency - Frequency view (weekly, monthly, yearly)
     */
    updateTotalCost(cost, viewFrequency) {
        this.#totalCostDisplay.textContent = `Total ${viewFrequency} cost: ${cost.toFixed(2)} kr`
    }

    /**
     * Shows error message to user.
     * 
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
     * Initializes the application by loading subscriptions and setting up event listeners.
     */
    async initialize() {
        try {
            await this.loadSubscriptions('monthly')
            
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
     * Loads and displays subscriptions for specified frequency.
     * 
     * @param {string} viewFrequency - Frequency to view (weekly, monthly, yearly)
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