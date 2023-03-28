import express, {NextFunction, Request, Response} from "express"

const  app = express();

import mongoose from "mongoose";
import {userRouter} from "./routers/user.router";
import {configs} from "./configs/config";
import {authRouter} from "./routers/auth.router";
import {ApiError} from "./errors/api.error";
import {cronRunner} from "./crons/cron.runner";
import {carRouter} from "./routers/car.router";
import fileUploader from "express-fileupload"



app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUploader())
app.use("/cars", carRouter);
app.use("/users",userRouter);
app.use("/auth", authRouter);

app.use((err:ApiError,req:Request,res:Response,next:NextFunction)=>  {
    const status = err.status ||500;

   res.status(err.status).json({
       message: err.message,
       status,
   })
})



app.listen(configs.PORT, ()=>  {
    mongoose.connect(configs.DB_URL);
    cronRunner();
    console.log(`Server has started on PORT ${configs.PORT}`)
})





