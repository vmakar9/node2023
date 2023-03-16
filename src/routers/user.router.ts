import {Router } from "express"
import {userController} from "../controllers/user.controller";

import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router()

router.get('/',userController.getAll);
router.get('/:userId',
    authMiddleware.checkAccessToken
    ,userController.getById);
router.post('/',
    userController.create);
router.put('/:userId',
    authMiddleware.checkAccessToken
    ,userController.update);
router.delete('/:userId',
    authMiddleware.checkAccessToken
    ,userController.delete);


export const userRouter = router