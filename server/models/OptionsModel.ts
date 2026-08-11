import { Field, ObjectType, ID } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Poll from "./PollModel.js";
@ObjectType()
@Entity()
export default class Options{
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Poll)
  @ManyToOne(() => Poll)
  @JoinColumn({ name: "poll_id" })
  poll_id!: Poll;

  @Field(() => String)
  @Column({ type: "varchar" })
  option!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
