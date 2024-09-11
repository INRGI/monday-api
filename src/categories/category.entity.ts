import PostEntity from "src/posts/post.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Category{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany(()=> PostEntity, (post: PostEntity) => post.categories)
    public posts: PostEntity[]
}

export default Category;