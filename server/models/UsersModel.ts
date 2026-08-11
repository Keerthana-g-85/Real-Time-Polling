import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Users{
    @Field(()=>ID)
    @PrimaryGeneratedColumn("uuid")
    id! : string

    @Field(()=>String)
    @Column({type:"varchar"})
    name! : string

    @Field(()=>String)
    @Column({type:"varchar"})
    email! : string

    @Column({type:"varchar"})
    password! : string

    @Field(()=>Date)
    @CreateDateColumn()
    createdAt! : Date

    @Field(()=>Date)
    @UpdateDateColumn()
    updatedAt! : Date

}