// Global .env Vars
require('dotenv').config()

import express from 'express'
import cors from 'cors'
// Import the api Router
import { apiDates } from './api/dates'

// setup the express app
const app = express()

// Define cors politics
app.use(cors({ optionsSuccessStatus: 200 }))

// Content for the Apps fron-page (instructions)
app.use('/', express.static('public'))
// Define the router that will handle the "/api" route
app.use('/api', apiDates)

// Start server listening on port XXXX
app.listen(process.env.PORT, () => {
   console.log('Server is listening in port', process.env.PORT)
})
