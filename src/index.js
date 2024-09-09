const express = require("express")
const messageRouter = require('./routers/messageRouter')
const whatsappclient = require('./services/WhatsappClient')

const app = express()
app.use(express.json())
app.use(messageRouter)
whatsappclient.startClient(4)
app.listen(3000, () => console.log(`Server is ready in on port 3000`))
