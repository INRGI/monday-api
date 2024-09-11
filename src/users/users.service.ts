import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
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
}