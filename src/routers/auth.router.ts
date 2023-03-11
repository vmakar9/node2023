import {Router } from "express"

import {userMiddleware} from "../middlewares/user.middleware";
import {authController} from "../controllers/auth.controller";


const router = Router()


router.post('/login',
    userMiddleware.isValidLogin,
    userMiddleware.getDynamicallyOrThrow("email"),
    authController.login)

router.post('/register',
    userMiddleware.isValidCreate,
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.register
    );



export const authRouter = router