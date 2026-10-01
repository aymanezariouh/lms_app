import dotenv from "dotenv";
dotenv.config();
import app from "./app.js"
import connectDB from "./config/db.js";
const Port = process.env.PORT ;
connectDB().then(()=>{
    app.listen(Port, ()=>{
        console.log(`conected au ${Port}`)
    });
});
