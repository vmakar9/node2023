import {Router } from "express"
import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middlewares/user.middleware";

const router = Router()

router.get('/',userController.getAll);
router.get('/:userId',userMiddleware.getByIdAndThrow,userController.getById);
router.post('/',userMiddleware.isUserValidCreate,userController.create);
router.put('/:userId',userMiddleware.isUserValidUpdate,userController.update);
router.delete('/:userId',userController.delete);


export const userRouter = router