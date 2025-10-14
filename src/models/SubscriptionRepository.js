/**
 * @file Repository for managing subscriptions.
 * @module src/models/SubscriptionRepository.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { Subscription, SubscriptionCollection, CostCalculator } from 'subscription-tracker'

/**
 * Manages subscription data through the subscription-tracker module.
 */
export class SubscriptionRepository {
    #collection
    #costCalculator

    /**
     * Creates a new subscription repository with empty collection.
     */
    constructor() {
        this.#collection = new SubscriptionCollection()
        this.#costCalculator = new CostCalculator()
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
     * Gets all subscriptions as plain objects.
     * 
     * @returns {Array} Array of subscription objects
     */
    getAllSubscriptionsAsPlainObjects() {
        const subscriptions = this.#collection.getAllSubscriptions()

        // Convert Subscription objects to plain objects for JSON
        return subscriptions.map(sub => ({
            name: sub.getName(),
            price: sub.getPrice(),
            frequency: sub.getFrequency(),
            category: sub.getCategory()
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
     * Gets total monthly cost of all active subscriptions.
     * 
     * @returns {number} Total monthly cost
     */
    getTotalMonthlyCost() {
        return this.#costCalculator.calculateTotalMonthlyCost(this.#collection.getAllSubscriptions())
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
}