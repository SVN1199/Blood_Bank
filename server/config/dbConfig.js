const mongoose = require('mongoose')

mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection

// verify connection
connection.on('connected',()=>{
    console.log('MongoDB Connected Successfully')
})

// verify connection server
connection.on('error',(err)=>{
    console.log("MongoDB Connection Error", err)
})