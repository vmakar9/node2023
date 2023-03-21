import {Router} from "express"

import {userMiddleware} from "../middlewares/user.middleware";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {EActionTokenType} from "../enum/action-token-type";


const router = Router()


router.post("/login",
    userMiddleware.getDynamicallyOrThrow("email"),
    authController.login)

router.post('/register',
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.register
    );

router.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh)

router.post('/password/change',
    authMiddleware.checkAccessToken,
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.changePassword)

router.post('/password/forgot',
    userMiddleware.getDynamicallyAndThrow("email"),
    authController.forgotPassword)

router.put('/password/forgot/:token',authMiddleware.checkActionToken,
    authMiddleware.checkOldPassword,
    authController.setForgotPassword,
    )

router.post('/acivate',
    userMiddleware.getDynamicallyOrThrow("email"),
    authController.sendActivateToken)

router.put('/activate/:token',
    authMiddleware.checkActionToken(EActionTokenType.activate),
    authController.activate)
export const authRouter = router