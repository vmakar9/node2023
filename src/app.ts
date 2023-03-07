import express, {NextFunction, Request, Response} from "express"

const  app = express();

import mongoose from "mongoose";
import {userRouter} from "./routers/user.router";
import {IError} from "./types/common.types";
import {configs} from "./configs/config";



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/users",userRouter)

app.use((err:IError,req:Request,res:Response,next:NextFunction)=>  {
    const status = err.status;

   res.status(err.status).json({
       message: err.message,
       status,
   })
})



app.listen(configs.PORT, ()=>  {
    mongoose.connect(configs.DB_URL);
    console.log(`Server has started on PORT ${configs.PORT}`)
})





