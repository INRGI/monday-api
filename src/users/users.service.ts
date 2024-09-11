import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import User from "./user.entity";
import { Repository } from "typeorm";
import CreateUserDTO from "./dto/createUser.dto";

@Injectable()
export class UsersService{
    constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

    async getByEmail(email: string){
        const user = await this.usersRepository.findOneBy({email});
        if(user) return user;

        throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDTO){
        const user = await this.usersRepository.create(userData);
       
        await this.usersRepository.save(user);
        return user;
    }

    async getById(id: number){
        const user = await this.usersRepository.findOneBy({id});
        if(user) return user;

        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number){
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersRepository.update(userId, {currentHashedRefreshToken});
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number){
        const user = await this.getById(userId);

        const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.currentHashedRefreshToken);

        if(isRefreshTokenMatching) return isRefreshTokenMatching;
    }

    async removeRefreshToken(userId: number) {
        return this.usersRepository.update(userId, {
          currentHashedRefreshToken: null
        });
      }
}