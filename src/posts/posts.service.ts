import { Injectable, Post } from '@nestjs/common';

import { UpdatePostDTO } from './dto/updatePost.dto';
import { CreatePostDTO } from './dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './post.entity';
import User from 'src/users/user.entity';
import { PostNotFoundException } from './exception/postNotFund.exception';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<PostEntity>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({relations: ['author']});
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({relations: ['author'], where: { id: id }});
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async updatePost(id: number, post: UpdatePostDTO) {
    await this.postsRepository.update(id, post);

    const updatedPost = await this.postsRepository.find({relations: ['author'], where: { id: id }});

    if (updatedPost) return updatedPost;

    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDTO, user: User) {
    const newPost = await this.postsRepository.create({...post, author: user});
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}
