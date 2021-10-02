const {Router} = require('express')
const fetch = require('node-fetch')
const Request = require('../models/request')
const router = Router()

router.get('/', async (req, res) => {
  const requests = await Request.getRequests()
  res.render('requests', {
    title: 'Запросы',
    isRequests: true,
    requests
  })
})

router.post('/edit', async (req, res) => {
  await Request.updateRequests(req.body)

  res.redirect('/requests')
})

router.get('/:id/edit', async(req, res) => {
  const request = await Request.getRequestById(req.params.id)
  
  let isGet = request.method.includes('GET')
  let isPost = request.method.includes('POST')
  let isAccept = false
  let isContentType = false
  let isAcceptAll = false
  let isAcceptHtml = false
  let isAcceptJson = false
  let isAcceptXml = false
  let isContentTypeHtml = false
  let isContentTypeJson = false
  let isContentTypeXml = false

  if(request.headers) {
    isAccept = request.headers.includes('Accept')
    isContentType = request.headers.includes('Content-Type')
  }
  
  if(request.acceptOptions) {
    isAcceptAll = request.acceptOptions.includes('*/*')
    isAcceptHtml = request.acceptOptions.includes('text/html')
    isAcceptJson = request.acceptOptions.includes('application/json')
    isAcceptXml = request.acceptOptions.includes('application/xml')
  }

  if(request.contentTypeOptions) {
    isContentTypeHtml = request.contentTypeOptions.includes('text/html')
    isContentTypeJson = request.contentTypeOptions.includes('application/json')
    isContentTypeXml = request.contentTypeOptions.includes('application/xml')
  }

  res.render('request-edit', {
    title: 'Редактировать запрос',
    request,
    isGet, isPost, 
    isAccept, isContentType, 
    isAcceptAll, isAcceptHtml, isAcceptJson, isAcceptXml,
    isContentTypeHtml, isContentTypeJson, isContentTypeXml
  })
})

router.get('/:id/remove', async (req, res) => {
  await Request.removeRequest(req.params.id)
  res.redirect('/requests')
})

router.post('/send', async(req, res) => {
  let request = await Request.getRequestById(req.body.id)
  
  if(request.method === 'GET') {
    const response = await fetch(request.url, {
     headers: {
       'Accept': `${request.acceptOptions}`,
       'Content-Type': `${request.contentTypeOptions}`
     }
    })
    const data = await response.text()
    const answer = `статус ${response.status}, заголовки: ${response.headers}`
    res.send(`${answer}</br>${data}</br><a href="/requests">еще раз</a>`)
  } else {
    const response = await fetch(request.url, {
	  method: 'post',
	  body: JSON.stringify(request.body),
	  headers: {
      'Accept': `${request.acceptOptions}`,
      'Content-Type': `${request.contentTypeOptions}`
    }
  })
  const data = await response.text()
  const answer = `статус ${response.status}, заголовки: ${response.headers}`
  res.send(`${answer}</br>${data}</br><a href="/requests">еще раз</a>`)
  }
})

module.exports = router