import { Field, ID, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Users from "./UsersModel.js";
import Poll from "./PollModel.js";

@ObjectType()
@Entity()
export default class AllowedUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Users)
  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user_id!: Users;

  @Field(() => Poll)
  @ManyToOne(() => Poll)
  @JoinColumn({ name: "poll_id" })
  poll_id!: Poll;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
