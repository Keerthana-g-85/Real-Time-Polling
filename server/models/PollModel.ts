import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Users from "./UsersModel.js";

@ObjectType()
@Entity()
export default class Poll {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  poll_name!: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  question!: string;

  @Field(() => Users)
  @ManyToOne(() => Users , {onDelete:"CASCADE"})
  @JoinColumn({ name: "user_id" })
  user_id!: Users;

  @Field(() => GraphQLISODateTime)
  @Column({ type: "timestamptz" })
  expire_time!: Date;

  @Field(() => String)
  @Column({ type: "varchar" })
  status!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
