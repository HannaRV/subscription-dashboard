/**
 * @file Application entry point that starts the Express server.
 * @module src/server.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { ApplicationServer } from './config/express.js'
import { SubscriptionRepository } from './models/SubscriptionRepository.js'

const PORT = process.env.PORT || 3000
const server = new ApplicationServer()
const app = server.getApplication()

// Test Repository
console.log('--- Testing SubscriptionRepository ---')
const repo = new SubscriptionRepository()

console.log('1. Add Netflix:')
const netflix = repo.addSubscription('Netflix', 149, 'monthly', 'streaming')
console.log('Added:', netflix)

console.log('\n2. Add Spotify:')
const spotify = repo.addSubscription('Spotify', 119, 'monthly', 'music')
console.log('Added:', spotify)

console.log('\n3. Get all subscriptions:')
console.log(repo.getAllSubscriptions())

console.log('\n4. Get total monthly cost:')
console.log(repo.getTotalMonthlyCost(), 'kr')

console.log('\n5. Remove Netflix:')
const removed = repo.removeSubscriptionByName('Netflix')
console.log('Removed:', removed)

console.log('\n6. Get all subscriptions after removal:')
console.log(repo.getAllSubscriptions())

console.log('\n7. Get new total:')
console.log(repo.getTotalMonthlyCost(), 'kr')

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
