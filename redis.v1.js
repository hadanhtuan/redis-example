const express = require("express")

const app = express()

app.get('/order', (req, res) => {
  const time = new Date().getTime()
  console.log(`Time request:::::${time}`)
  return res.json({
    status: 'success',
    msg: 'OK',
    time
  })
})


app.listen(3000, ()=> {
  console.log("Server running at port 3000")
})




