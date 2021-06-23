import express from 'express'
export const apiDates = express.Router()

// Request logger for the api
apiDates.use((req: express.Request, _res: express.Response, next: any) => {
   console.log(
      `${req.method} ON ${req.url} BY ${
         req.ip
      } @ ${new Date().toLocaleDateString()}`
   )
   next()
})

/**
 * This is a middleware function that validates the recieved date format.
 * Validates for the UTC format by a Date().toUTCString(), and the unix time format by a regexp
 * @param req The recieved Http Request
 * @param res The response writer
 * @param next Then next function in the call list (stack?)
 * @returns If the passed __date format is not valid__, returns with __status code__ `400`(bad user request), and the object `{error: "Invalid Date"}`
 */
const reqDateValidator = (
   req: express.Request,
   res: express.Response,
   next: any
) => {
   // Invalid date param
   if (
      new Date(req.params.date).toUTCString() === 'Invalid Date' &&
      !req.params.date.match(/^[0-9]{1,20}$/gm)
   )
      res.status(400).json({ error: 'Invalid Date' })
   else {
      next()
   }
}

// The complete route is `[app_url]/api/:date`
// Checks the date "time format" then creates the responsse object acordingly
// with the unix and utc respective time values
apiDates.route('/:date').get(reqDateValidator, (req, res) => {
   if (req.params.date.match(/^[0-9]{1,20}$/gm)) {
      res.status(200).json({
         unix: Number(new Date(Number(req.params.date))),
         utc: new Date(Number(req.params.date)).toUTCString(),
      })
   } else {
      res.status(200).json({
         unix: Number(new Date(req.params.date)),
         utc: new Date(req.params.date).toUTCString(),
      })
   }
})

// The complete route is `[app_url]/api(/)`
// this route returns the current time in both formats, unix and utc
apiDates.route('/').get((_req, res) => {
   res.status(200).json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
   })
})

// the 404 route for the API
apiDates.use('*', (req, res) => {
   console.log(req.url, '404')
   res.end('404')
})
