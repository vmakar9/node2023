import {NextFunction,Request,Response} from "express";
import {User} from "../models/User.model";
import {ApiError} from "../errors/api.error";
import {IUser} from "../types/user.types";

class UserMiddleware {
    public async getByIdOrThrow(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new ApiError("User not found", 422);
            }

            res.locals = { user };
            next();
        } catch (e) {
            next(e);
        }
    }

    public getDynamicallyAndThrow(
        fieldName: string,
        from: "body" | "query" | "params" = "body",
        dbField: keyof IUser = "email"
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await User.findOne({ [dbField]: fieldValue });

                if (user) {
                    throw new ApiError(
                        `User with ${fieldName} ${fieldValue} already exist`,
                        409
                    );
                }

                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public getDynamicallyOrThrow(
        fieldName: string,
        from: "body" | "query" | "params" = "body",
        dbField: keyof IUser = "email"
    ) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const fieldValue = req[from][fieldName];

                const user = await User.findOne({ [dbField]: fieldValue });

                if (!user) {
                    throw new ApiError(`User not found`, 422);
                }

                req.res.locals = { user };

                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const userMiddleware = new UserMiddleware();