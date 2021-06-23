import express from 'express'
export const api = express.Router()

api.use((req: express.Request, _res: express.Response, next: any) => {
   console.log(
      `${req.method} ON ${req.url} BY ${
         req.ip
      } @ ${new Date().toLocaleDateString()}`
   )
   next()
})

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

api.route('/:date').get(reqDateValidator, (req, res) => {
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

api.route('/').get((_req, res) => {
   res.status(200).json({
      unix: new Date().getTime(),
      utc: new Date().toUTCString(),
   })
})

api.use('*', (req, res) => {
   console.log(req.url, '404')
   res.end('404')
})
