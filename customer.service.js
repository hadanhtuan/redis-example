const redis = require("redis");
let client = redis.createClient({ url: 'redis://127.0.0.1:6380'});  

(async () => {
  await client.connect();
  try {
    console.log('connected');
  } catch (err) {
    console.error('error::::',err)
  }
})()

const express = require("express")
const app = express()

app.use(express.json())

app.get('/order', async (req, res) => {

  const stockNumber = 10;

  const keyName = 'iPhone14'

  const getkey = await client.exists(keyName);

  if(!getkey) {
    await client.setNX(keyName, 0)
  }

  let soldNumber = await client.get(keyName)
  soldNumber = await client.incrBy(keyName, 1)  //buy 1 at the time

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

app.post('/order-but-not-login', async(req, res) => {
  const {userId, productId} = req.body

  await client.set(`${userId}:${productId}`, 'Cancel order') //expire after 10 sec
  await client.expire(`${userId}:${productId}`, 3)
  
  res.json({
    status: 'success',
    message: 'Dat hang thanh cong'
  })
})

app.listen(3000, ()=> {
  console.log("Server running at port 3000")
})




