const express = require("express")
const app = express()
const PORT  = 3500
const userRouter = require("./router/userRouter")
const adminRouter = require("./router/adminRouter")
const subscriptionRouter = require("./router/subscriptionRouter")
const organizationRouter = require("./router/organizationRouter")
const productRouter = require("./router/productRouter")
const cors = require ("cors");

require("./config/db")
const bodyParser = require("body-parser")
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

// parse application/json
app.use(bodyParser.json())
app.use("/",adminRouter)
app.use("/", subscriptionRouter)
app.use("/", organizationRouter)
app.use("/",userRouter)
app.use("/", productRouter)

app.get('/', () =>{
    console.log("hello from server");
})

app.listen(PORT , ()=>{
    console.log(`server listening to the port no ${PORT}`);
})
