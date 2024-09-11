import Category from 'src/categories/category.entity';
import User from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(()=> User, (author: User)=> author.posts)
  public author: User; 

  @JoinTable()
  @ManyToMany(()=>Category, (category: Category)=>category.posts)
  public categories: Category[]
}

export default PostEntity;
