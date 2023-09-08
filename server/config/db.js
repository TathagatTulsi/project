const mongoose = require("mongoose")
// const mongo_uri = "mongodb+srv://Tulsi_User:Tulsi_User@cluster0.0vi613m.mongodb.net/crud?retryWrites=true&w=majority"
const mongo_uri = "mongodb://localhost:27017/saas"
// const mongo_uri = "mongodb+srv://Tulsi_User:Tulsi_User@cluster0.0vi613m.mongodb.net/"
mongoose.connect(mongo_uri , {
    useNewUrlParser:true , 
    useUnifiedTopology:true})
    .then((res)=>{
        console.log("database connected")
    })
    .catch((err)=>{
        console.log("error has occured")
    })

