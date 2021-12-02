const app = require('./app');
const connectDatabase = require('./config/database'); //should be done after dotenv.config
const PORT=4000;


//Connecting to database
connectDatabase();

app.listen(PORT,()=>{
    console.log(`Server is working on http://localhost:${PORT}`)
})

