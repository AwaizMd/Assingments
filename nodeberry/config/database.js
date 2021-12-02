const mongoose=require('mongoose');

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>{
        console.log(`MongoDB Connected with Server`);
    })
};

module.exports = connectDatabase;