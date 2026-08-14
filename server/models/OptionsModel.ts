import { Field, ObjectType, ID } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Vote from "./VoteModel.js";
import Poll from "./PollModel.js";
@ObjectType()
@Entity()
export default class Options {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => Poll)
  @ManyToOne(() => Poll, { onDelete: "CASCADE" })
  @JoinColumn({ name: "poll_id" })
  poll_id!: Poll;

  @Field(() => String)
  @Column({ type: "varchar" })
  option!: string;

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.option_id)
  votes!: Vote[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
