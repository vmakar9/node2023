import {Router } from "express"
import {userController} from "../controllers/user.controller";

import {authMiddleware} from "../middlewares/auth.middleware";
import {userMiddleware} from "../middlewares/user.middleware";

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
router.put(
    "/:userId/avatar",
    authMiddleware.checkAccessToken,
    userMiddleware.getByIdOrThrow,
    userController.uploadAvatar
);

export const userRouter = router