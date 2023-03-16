import {Router } from "express"

import {userMiddleware} from "../middlewares/user.middleware";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";


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

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh)

router.post('/password/change',
    userMiddleware.isValidChangePassword,
    authMiddleware.checkAccesToken,
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.changePassword)

router.post('/password/forgot',
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.forgotPassword)

router.put('/password/forgot/:token',authMiddleware.checkActionForgotToken,authController.setForgotPassword)

export const authRouter = router