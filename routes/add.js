const {Router} = require('express')
const Request = require('../models/request')
const router = Router()

router.get('/', (req, res) => {
  res.render('add', {
    title: 'Добавить запрос',
    isAdd: true
  })
})

router.post('/', async (req, res) => {
  const request = new Request(req.body.url, req.body.method, req.body.headers, req.body.acceptOptions, req.body.contentTypeOptions, req.body.body)

  await request.saveRequest()

  res.redirect('/requests')
})

module.exports = router