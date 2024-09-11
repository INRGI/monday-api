import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import PostsService from "./posts.service";
import { CreatePostDTO } from "./dto/createPost.dto";
import { UpdatePostDTO } from "./dto/updatePost.dto";
import JwtAuthenticationGuard from "src/authentication/jwt-authentication.guard";
import FindOneParams from "src/utils/findOneParams";


@Controller('posts')
export default class PostsController {
    constructor(
        private readonly postsService: PostsService
    ){}

    @Get()
    getAllPosts(){
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    getPostById(@Param() {id}: FindOneParams){
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post:CreatePostDTO){
        return this.postsService.createPost(post);
    }

    @Put(':id')
    async replacePost(@Param('id') id:string, @Body() post:UpdatePostDTO){
        return this.postsService.updatePost(Number(id), post);
    }

    @Delete(':id')
    async deletePost(@Param() id: string){
        return this.postsService.deletePost(Number(id));
    }
}