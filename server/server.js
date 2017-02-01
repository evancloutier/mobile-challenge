'use strict'

const express = require('express')
const util = require('util')
const bodyParser = require('body-parser')
const qs = require('querystring')

const CONSUMER_KEY = 'QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'
const CONSUMER_SECRET = 'crMGwh2cf76lm2TUt6I9B6qSeDW6xpYKci4QBBrF'

const app = express()
app.use(({method, url}, rsp, next) => {
  rsp.on('finish', () => {
    console.log(`${rsp.statusCode} ${method} ${url}`)
  })
  next()
})
app.use(bodyParser.json({ verify: verifyRequestSignature }))

app.get('/', (req, res) => {
  console.log("We are hitting the index")
})

app.get('/callback', (req, res) => {
  console.log("-----------------------")
  console.log(req)
  console.log(req)
  console.log("-----------------------")
})

app.listen(3445)
console.log("Server is listening on port 3445")

function verifyRequestSignature(req, res, buf) {
  let signature = req.headers["x-hub-signature"]

  if (!signature) {
    console.error("Couldn't validate the signature.")
  } else {
    let elements = signature.split('=')
    let method = elements[0]
    let signatureHash = elements[1]

    let expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
                        .update(buf)
                        .digest('hex')

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.")
    }
  }
}
