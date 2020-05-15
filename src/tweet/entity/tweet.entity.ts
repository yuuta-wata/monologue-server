import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'tweet' })
export class Tweet {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  userid: number;

  @Field()
  @Column('text')
  nickname: string;

  @Field()
  @Column('text')
  tweet: string;
}
