const express = require("express")
const {get,set,setnx,incrby,exists} = require('./model.redis')

const app = express()

app.get('/order', async (req, res) => {

  const stockNumber = 10;

  const keyName = 'iPhone14'

  const orderNumber = 1;

  const getkey = await exists(keyName);

  if(!getkey) {
    await setnx(keyName, 0)
  }

  let soldNumber = await get(keyName)
  soldNumber = await incrby(keyName, 1)  //buy 1 at the time

  if (soldNumber > stockNumber) {
    return res.json({
      status: 'error',
      message: 'Het hang'
    })
  }

  console.log('Sold order number: ', soldNumber)
  return res.json({
    status: 'OK',
    message: 'Mua hang thanh cong'
  })



})


app.listen(3000, ()=> {
  console.log("Server running at port 3000")
})




