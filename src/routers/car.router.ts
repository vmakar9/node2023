import { Router } from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {carController} from "../controllers/car.controller";
import {carMiddleware} from "../middlewares/car.middleware";



const router = Router();

router.post(
    "/",
    authMiddleware.checkAccessToken,
    carController.create
);

router.get(
    "/:carId",
    authMiddleware.checkAccessToken,
    carMiddleware.getByIdOrThrow,
    carController.getById
);
router.put(
    "/:carId",
    authMiddleware.checkAccessToken,
    carMiddleware.getByIdOrThrow,
    carController.update
);
router.delete(
    "/:carId",
    authMiddleware.checkAccessToken,
    carMiddleware.getByIdOrThrow,
    carController.delete
);

export const carRouter = router;