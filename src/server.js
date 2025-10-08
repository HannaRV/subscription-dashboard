/**
 * @file Application entry point that starts the Express server.
 * @module src/server.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { ApplicationServer } from './config/express.js'
import { SubscriptionCollection } from 'subscription-tracker'

const PORT = process.env.PORT || 3000
const server = new ApplicationServer()
const app = server.getApplication()

// Test that module works
const collection = new SubscriptionCollection()
collection.addSubscription('Netflix', 149, 'monthly', 'streaming')
console.log('✓ Module linked successfully!')
console.log('Test subscription:', collection.getAllSubscriptions())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})