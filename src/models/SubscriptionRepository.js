/**
 * @file Repository for managing subscriptions.
 * @module src/models/SubscriptionRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { Subscription, SubscriptionCollection, CostCalculator } from '@hr222sy/subscription-tracker'

/**
 * Manages subscription data through the subscription-tracker module.
 */
export class SubscriptionRepository {
    #collection
    #costCalculator
    #frequencyCalculators

    /**
     * Creates a new subscription repository with empty collection.
     */
    constructor() {
        this.#collection = new SubscriptionCollection()
        this.#costCalculator = new CostCalculator()

        // Map frequencies to calculator methods
        this.#frequencyCalculators = {
            weekly: {
                single: (subscription) => this.#costCalculator.calculateWeeklyCost(subscription),
                total: (subscriptions) => this.#costCalculator.calculateTotalWeeklyCost(subscriptions)
            },
            monthly: {
                single: (subscription) => this.#costCalculator.calculateMonthlyCost(subscription),
                total: (subscriptions) => this.#costCalculator.calculateTotalMonthlyCost(subscriptions)
            },
            yearly: {
                single: (subscription) => this.#costCalculator.calculateYearlyCost(subscription),
                total: (subscriptions) => this.#costCalculator.calculateTotalYearlyCost(subscriptions)
            }
        }
    }

    /**
     * Adds a new subscription to the collection.
     * 
     * @param {string} name - Subscription name
     * @param {number} price - Price amount
     * @param {string} frequency - Payment frequency
     * @param {string} category - Subscription category
     * @returns {object} The created subscription
     */
    addSubscription(name, price, frequency, category) {
        const subscription = new Subscription(name, price, frequency, category)
        this.#collection.addSubscription(subscription)
        return subscription
    }

    /**
     * Gets all subscriptions as plain objects with costs converted to requested frequency.
     * 
     * @param {string} [viewFrequency='monthly'] - 'weekly' | 'monthly' | 'yearly'
     * @returns {Array<object>} Subscriptions with { name, originalPrice, originalFrequency, category, displayCost }
     */
    getAllSubscriptionsAsPlainObjects(viewFrequency = 'monthly') {
        const subscriptions = this.#collection.getAllSubscriptions()
        const calculator = this.#getCalculatorForFrequency(viewFrequency)

        return subscriptions.map(subscription => ({
            name: subscription.getName(),
            originalPrice: subscription.getPrice(),
            originalFrequency: subscription.getFrequency(),
            category: subscription.getCategory(),
            displayCost: calculator.single(subscription)
        }))
    }

    /**
     * Removes a subscription by name.
     * 
     * @param {string} name - Name of subscription to remove
     * @returns {boolean} True if removed, false otherwise
     */
    removeSubscriptionByName(name) {
        const subscription = this.#findSubscriptionByName(name)
        if (subscription) {
            return this.#collection.removeSubscription(subscription)
        }
        return false
    }

    /**
     * Gets total cost of all active subscriptions in specified frequency.
     *
     * @param {string} viewFrequency - Frequency to calculate total (weekly, monthly, yearly)
     * @returns {number} Total cost in specified frequency
     */
    getTotalCost(viewFrequency = 'monthly') {
        const subscriptions = this.#collection.getAllSubscriptions()
        const calculator = this.#getCalculatorForFrequency(viewFrequency)

        return calculator.total(subscriptions)
    }

    /**
     * Finds a subscription by name.
     * 
     * @param {string} name - Subscription name
     * @returns {object|undefined} Subscription object if found
     */
    #findSubscriptionByName(name) {
        const subscriptions = this.#collection.getAllSubscriptions()
        return subscriptions.find(subscription => subscription.getName() === name)
    }

    /**
     * Gets calculator for specified frequency.
     *
     * @param {string} viewFrequency - Frequency to view (weekly, monthly, yearly)
     * @returns {object} Calculator with single and total methods
     */
    #getCalculatorForFrequency(viewFrequency) {
        const calculator = this.#frequencyCalculators[viewFrequency]

        if (!calculator) {
            return this.#frequencyCalculators.monthly
        }

        return calculator
    }
}