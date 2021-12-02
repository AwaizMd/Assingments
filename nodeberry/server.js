const dotenv = require('dotenv');
const app= require('./app');

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`);
})


dotenv.config({path:"/config/config.env"});

