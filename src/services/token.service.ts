import * as jwt from "jsonwebtoken"
import {IActionTokenPayload, ITokenPair, ITokenPayload} from "../types/token.types";
import {ApiError} from "../errors/api.error";
import {ETokenType} from "../enum/token.enum";
import {EActionTokenType} from "../enum/action-token-type";
import {configs} from "../configs/config";

class TokenService {
    public generateTokenPair(payload: { name: string; _id: string }): ITokenPair {
        const accessToken = jwt.sign(payload,configs.ACCESS_SECRET, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
            expiresIn: "30d",
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    public generateActionToken(payload: any, tokenType: EActionTokenType): string {
        let secret = "";

        switch (tokenType) {
            case EActionTokenType.activate:
                secret = configs.ACTIVATE_SECRET
                break;
            case EActionTokenType.forgot:
                secret = configs.FORGOT_SECRET
                break;
        }

        return jwt.sign(payload, secret, {expiresIn: "7d"})
    }

    public checkToken(token: string, tokenType = ETokenType.access): ITokenPayload {
        try {
            let secret = '';
            switch (tokenType) {
                case ETokenType.access:
                    secret = configs.ACCESS_SECRET;
                    break;
                case ETokenType.refresh:
                    secret = configs.REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    }
    public checkActionToken(token: string, tokenType: EActionTokenType) {
        try {
            let secret = "";

            switch (tokenType) {
                case EActionTokenType.forgot:
                    secret = configs.FORGOT_SECRET;
                    break;
                case EActionTokenType.activate:
                    secret = configs.ACTIVATE_SECRET;
                    break;
            }

            return jwt.verify(token, secret) as IActionTokenPayload;
        } catch (e) {
            throw new ApiError("Token not valid", 401);
        }
    }
}


export const tokenService = new TokenService();