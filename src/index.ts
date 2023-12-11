import express, { Application } from 'express'
import { routes } from './routes'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'

import deserializeToken from './middleware/deserializedToken'

const app: Application = express()
const port: Number = 4000

// Parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CORS Handle
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})
app.use(deserializeToken)
routes(app)
app.listen(port, () => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    logger.info(`Server listening on port ${port}`)
})
