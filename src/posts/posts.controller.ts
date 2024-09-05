import { Controller, Get, Param, Post } from "@nestjs/common";


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
    getPostById(@Param('id') id:string){
        return this.postsService.getPostById(Number(id));
    }

    @Post()
    async createPost(){
        
    }
}