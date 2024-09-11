import { Body, Controller, Get, HttpCode, Post, Req, SerializeOptions, UseGuards } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import RegisterDTO from "./dto/register.dto";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
import RequestWithUser from "./requestWithUser.interface";
import JwtAuthenticationGuard from "./jwt-authentication.guard";

@Controller('authentication')
@SerializeOptions({strategy: "excludeAll"})
export class AuthenticationController{
    constructor(private readonly authenticationService: AuthenticationService){};

    @Post('register')
    async register(@Body() registrationData: RegisterDTO){
        return this.authenticationService.register(registrationData);
    };

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestWithUser){
        const {user} = request;
        const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
        request.res.setHeader('Set-Cookie', cookie);

        return user;
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithUser){
        const user = request.user;

        return user;
    }
}