import { NotFoundException } from "@nestjs/common";

class CategoryNotFoundException extends NotFoundException{
    constructor(postId: number){
        super(`Post with this id: ${postId} Not Found`)
    }
};

export default CategoryNotFoundException;