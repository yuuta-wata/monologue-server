import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tweet } from './entity/tweet.entity';
import { JwtPayload } from '../interfaces/jwtPayload';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
  ) {}

  async allTweet(): Promise<Tweet[]> {
    return this.tweetRepository.find();
  }

  async tweet(payload: JwtPayload): Promise<Tweet[]> {
    return this.tweetRepository.find({ where: { userid: payload.userId } });
  }

  async create(payload: JwtPayload, tweetContent: string): Promise<boolean> {
    try {
      const tweets = this.tweetRepository.create({
        userid: payload.userId,
        nickname: payload.nickName,
        tweet: tweetContent,
      });
      await this.tweetRepository.save(tweets);
      return true;
    } catch {
      console.error('ツイート出来ませんでした。');
    }
  }
}
