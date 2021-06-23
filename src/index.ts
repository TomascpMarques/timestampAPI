// Global .env Vars
require('dotenv').config()

import express from 'express'
import cors from 'cors'

// setup the express app
const app = express()

app.use(cors({ optionsSuccessStatus: 200 }))
app.use('/', express.static('public'))

// Start server listening on port XXXX
app.listen(process.env.PORT, () => {
   console.log('Server is listening in port', process.env.PORT)
})
