const app = require('./app')

const dotenv = require('dotenv');
const connectDatabase = require('./config/database')

// handling uncaught exception 
process.on("uncaughtException",(err)=>{
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to uncaught exception error`);
    process.exit(1);
})


// config 
dotenv.config({path: './config/config.env'})

//conncting to the database
connectDatabase()

const server = app.listen(process.env.PORT,() =>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})


//unhandled promise rejection 
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });

})
