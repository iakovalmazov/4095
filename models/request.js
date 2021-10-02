const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

class Request {
  constructor(url, method, headers, acceptOptions, contentTypeOptions, body) {
    this.id = uuidv4()
    this.url = url
    this.method = method
    this.headers = headers
    this.acceptOptions = acceptOptions
    this.contentTypeOptions = contentTypeOptions
    this.body = body
  }

  toJSON() {
    return {
      id: this.id,
      url: this.url,
      method: this.method,
      headers: this.headers,
      acceptOptions: this.acceptOptions,
      contentTypeOptions: this.contentTypeOptions,
      body: this.body
    }
  }

  async saveRequest() {
    const requests = await Request.getRequests()
    requests.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'requests.json'),
        JSON.stringify(requests),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static getRequests() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'requests.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }

  static async getRequestById(id) {
    const requests = await Request.getRequests()
    return requests.find(c => c.id === id)
  }

  static async updateRequests(request) {
    const requests = await Request.getRequests()

    const idx = requests.findIndex(c => c.id === request.id)
    requests[idx] = request

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'requests.json'),
        JSON.stringify(requests),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }

  static async removeRequest(id) {
    let requests = await Request.getRequests()
    requests = requests.filter(c => c.id !== id)

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'requests.json'),
        JSON.stringify(requests),
        (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        }
      )
    })
  }


}

module.exports = Request