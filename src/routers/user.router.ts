import {Router } from "express"
import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middlewares/user.middleware";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router()

router.get('/',userController.getAll);
router.get('/:userId',
    authMiddleware.checkAccesToken
    ,userMiddleware.getByIdAndThrow
    ,userController.getById);
router.post('/',
    userMiddleware.isValidCreate
    ,userController.create);
router.put('/:userId',
    authMiddleware.checkAccesToken
    ,userMiddleware.isValidUpdate,userController.update);
router.delete('/:userId',
    authMiddleware.checkAccesToken
    ,userController.delete);


export const userRouter = router