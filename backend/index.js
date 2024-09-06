const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const port = 3000

app.use(express.json())

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
  // console.log(req.params)
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

app.post('/data', (req, res) => {

  fs.readFile(`${__dirname}/data.json`, (err, data) => {
    if (err) {
      console.log("error at reading the file", err)
      res.status(500).json("error at reading the file")
    } else {
      const jsonData = JSON.parse(data)

      const existingUser = jsonData.find(user => user.id === req.body.id)

      if (existingUser) {
        return res.status(400).json(`User with id ${req.body.id} already exists`)
      }

      jsonData.push(req.body)

      fs.writeFile(`${__dirname}/data.json`, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.log("error at writing the file", err)
          res.status(500).json("error at writing the file")
        } else {
          res.json(`successfully added user with id ${req.body.id}`);
        }
      })
    }
  })

  // res.json("response");
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})