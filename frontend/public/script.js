console.log("loaded")

fetch('/data')
  .then(res => res.json())
  .then(data => console.log(data))

fetch('/data/kismacska')
  .then(res => res.json())
  .then(data => console.log(data))

fetch('/data/201')
  .then(res => res.json())
  .then(data => console.log(data))