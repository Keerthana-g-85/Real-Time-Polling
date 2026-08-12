import { Field, GraphQLISODateTime, ID, ObjectType } from "type-graphql";
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
import Users from "./UsersModel.js";
import Options from "./OptionsModel.js";
import AllowedUser from "./AllowedUsersModel.js";

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
  @ManyToOne(() => Users, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user_id!: Users;

  @Field(() => [Options])
  @OneToMany(() => Options, (options) => options.poll_id)
  @JoinColumn({ name: "option_id" })
  option_id!: Options[];

  @Field(() => [AllowedUser])
  @OneToMany(() => AllowedUser, (allowedUser) => allowedUser.poll_id)
  allowed_users!: AllowedUser[];

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
