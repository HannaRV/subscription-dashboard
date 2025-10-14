/**
 * @file Application entry point that starts the Express server.
 * @module src/server.js
 * @author Hanna Rubio Vretby <hr222sy@student.lnu.se>
 * @version 1.0.0
 */

import { ExpressApplication } from './config/express.js'

const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV || 'development'

const server = new ExpressApplication()
const app = server.getApplication()

app.listen(PORT, () => {
    if (NODE_ENV === 'development') {
        console.log(`Server is running on http://localhost:${PORT}`)
    }
    console.log(`Environment: ${NODE_ENV}`)
})
