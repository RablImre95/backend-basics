const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/index.html'))
    res.send("hello world")
})

app.use('/public', express.static(path.join(__dirname, '/../frontend/public')))

app.get('/data', (req, res) => {
    res.json({name: "kismacska"})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})