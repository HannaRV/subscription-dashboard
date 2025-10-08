/**
 * @file Main application router.
 * @module src/routes/router.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { SubscriptionRepository } from '../models/SubscriptionRepository.js'

export const router = express.Router()
router.get('/', (req, res) => {
    res.send('<h1>Subscription Dashboard</h1><p>App is running!</p>')
})
