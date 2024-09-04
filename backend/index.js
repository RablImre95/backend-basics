const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/index.html'))
})

app.use('/public', express.static(path.join(__dirname, '/../frontend/public')))

app.get('/data', (req, res) => {
  fs.readFile(`${__dirname}/data.json`, (err, data) => {
    if (err) {
      console.log("error at reading the file", err)
      res.json("error at reading the file")
    } else {
      const jsonData = JSON.parse(data)
      const result = jsonData.map(obj => obj.id)
      res.json(result)
    }
  })
})

app.get('/data/:id', (req, res) => {
  console.log(req.params)
  const searchId = Number(req.params.id)

  if (isNaN(searchId)) {
   return res.status(400).json(`id must be number`)
  }

  fs.readFile(`${__dirname}/data.json`, (err, data) => {
    if (err) {
      console.log("error at reading the file", err)
      res.status(500).json("error at reading the file")
    } else {
      const jsonData = JSON.parse(data)
      const result = jsonData.find(obj => obj.id === searchId)

      if (result === undefined) {
        res.status(404).json(`no user found with id ${searchId}`)
      } else {
        res.status(200).json(result)
      }
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})