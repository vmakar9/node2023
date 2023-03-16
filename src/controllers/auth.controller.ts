import {NextFunction,Request,Response} from "express";
import {authService} from "../services/auth.service";

import {ITokenPair} from "../types/token.types";


class AuthController {

    public async register(req:Request, res:Response,next:NextFunction){
        try {
            await authService.register(req.body);
            res.sendStatus(201);
        }catch (e) {
            next(e);
        }
    }

    public async login(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<ITokenPair>> {
        try {
            const { email, password } = req.body;
            const { user } = req.res.locals;

            const tokenPair = await authService.login({ email, password }, user);

            return res.status(200).json(tokenPair);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<ITokenPair>> {
        try {
            const { tokenInfo, jwtPayload } = req.res.locals;
            console.log(tokenInfo)
            const tokenPair = await authService.refresh(tokenInfo, jwtPayload);

            return res.status(200).json(tokenPair);
        } catch (e) {
            next(e);
        }
    }

    public async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { tokenInfo } = req.res.locals;
            const { oldPassword, newPassword } = req.body;
            console.log(tokenInfo)
            await authService.changePassword(
                tokenInfo._user_id,
                oldPassword,
                newPassword
            );

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
    public async forgotPassword(req: Request, res: Response, next: NextFunction):Promise<void> {
        try {
            const {user} = req.res.locals;
           await authService.forgotPassword(user)

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
    public async setForgotPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { password } = req.body;
            const { tokenInfo } = req.res.locals;
            console.log(tokenInfo)
            await authService.setForgotPassword(password, tokenInfo._user_id);

            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();