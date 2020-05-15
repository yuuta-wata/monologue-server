import { InputType, Field } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class TweetInput {
  @PrimaryGeneratedColumn()
  tweetid: number;

  @Field()
  tweet: string;
}
