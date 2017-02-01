'use strict'
const fs = require('fs')
const qs = require('querystring')
const request = require('request')

const consumerKey = 'QDYiyC7Nqt9ivdwjjgn46rmqVNqlrz21BHUANHED'
const consumerSecret = 'crMGwh2cf76lm2TUt6I9B6qSeDW6xpYKci4QBBrF'
const redirectUri = 'https://45f485e3.ngrok.io/callback'

let oauthToken = ""
let oauthSecret = ""

// BASE URL: https://api.500px.com
// REQUEST TOKEN: https://api.500px.com/v1/oauth/request_token
// ACCESS TOKEN: https://api.500px.com/v1/oauth/access_token
// AUTHORIZE: https://api.500px.com/v1/oauth/authorize

const getRequestToken = () => {
  return new Promise((resolve, reject) => {
    const url = "https://api.500px.com/v1/oauth/request_token"
    const oauth = {
      callback: redirectUri,
      consumer_key: consumerKey,
      consumer_secret: consumerSecret
    }

    request.post({ url: url, oauth: oauth }, (error, response, body) => {
      if (error)
        reject(error)
      resolve(body)
    })

  })
}

const authorizeRequestToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    const url = "https://api.500px.com/v1/oauth/access_token"
    const oauth = {
      callback: redirectUri,
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      token: token,
      token_secret: secret
    }

    request.post({ url: url, oauth: oauth }, (error, response, body) => {
      if (error)
        reject(error)
      console.log(body)
    })
  })
}

getRequestToken().then((requestData) => {
  const tokenData = requestData.split("&")
  authorizeRequestToken(tokenData[0], tokenData[1]).then((authorizeData) => {

  })

})
