import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import {Request} from 'express'
import { UsersService } from "src/users/users.service";
import { TokenPayload } from "../tokenPayload.interface";


@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token'){
    constructor(
        private readonly usersService: UsersService,
        private readonly  configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
              return request?.cookies?.Refresh;
            }]),
            secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
            passReqToCallback: true,
          });
    }

    async validate(request: Request, payload: TokenPayload){
        const refreshToken = request.cookies?.Refresh;
        return this.usersService.getUserIfRefreshTokenMatches(refreshToken, payload.userId);
    }
}