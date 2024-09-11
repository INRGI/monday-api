import { Exclude, Expose } from "class-transformer";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Adress from "./address.entity";
import PostEntity from "src/posts/post.entity";


@Entity()
class User{
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({unique: true})
    @Expose()
    public email: string;

    @Expose()
    @Column()
    public name: string;

    @Column()
    @Exclude()
    public password: string;

    @OneToOne(() => Adress, {eager: true, cascade: true})
    @JoinColumn()
    public address: Adress;

    @OneToMany(()=> PostEntity, (post: PostEntity)=> post.author)
    public posts: PostEntity[]
}

export default User;