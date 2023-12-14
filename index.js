const express = require('express')
const Razorpay = require("razorpay")

const app = express()

app.use(express.json())

app.get('/hi', (req, res) => {
    res.send("Hello from backend!")
})

app.post("/order", async (req, res) => {
    const amount = req.body.amount

    var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

    const options = {
        amount: amount * 100,   //amount in smallest division. In our case it is paise
        currency: "INR",
        receipt: "receipt#1",   // you can generate and use nano IDs and UUIDs
    }
    const myOrder = await instance.orders.create(options)

    res.status(201).json({
        success: true,
        amount,
        order: myOrder
    })
})


app.listen(4000, () => console.log(`Server is running on port 4000...`))