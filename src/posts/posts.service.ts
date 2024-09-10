import { HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';

import { UpdatePostDTO } from './dto/updatePost.dto';
import { CreatePostDTO } from './dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './post.entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<PostEntity>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: UpdatePostDTO) {
    await this.postsRepository.update(id, post);

    const updatedPost = await this.postsRepository.findOneBy({ id: id });

    if (updatedPost) return updatedPost;

    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDTO) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
