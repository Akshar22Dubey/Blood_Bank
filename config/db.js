const mongoose = require('mongoose')
const connectDB =async()=>{
           try{
                 await mongoose.connect(process.env.MONGO_URL)
                 console.log(`Connected To Mongodb Database ${mongoose.connection.host}`);
           }
           catch{
            console.log(`Mongodb database error`)
           }
}


module.exports= connectDB;