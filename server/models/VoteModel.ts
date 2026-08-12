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
import Options from "./OptionsModel.js";

@ObjectType()
@Entity()
export default class Vote {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Users)
  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user_id!: Users;

  @Field(() => Poll)
  @ManyToOne(() => Poll, { onDelete: "CASCADE" })
  @JoinColumn({ name: "poll_id" })
  poll_id!: Poll;

  @Field(() => Options)
  @ManyToOne(() => Options, { onDelete: "CASCADE" })
  @JoinColumn({ name: "option_id" })
  option_id!: Options;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
