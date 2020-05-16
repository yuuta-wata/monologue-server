import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  // 全ユーザ〜のツイートを取得
  async allTweet(): Promise<Tweet[]> {
    return this.tweetRepository.find();
  }
  // 個人のツイートを取得
  async tweet(payload: JwtPayload): Promise<Tweet[]> {
    return this.tweetRepository.find({ where: { userid: payload.userId } });
  }
  // ツイートを作成
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
  // ツイートを削除
  async delete(tweetId: number, payload: JwtPayload): Promise<boolean> {
    const tweets = await this.tweetRepository.findOne({
      where: { id: tweetId, userid: payload.userId },
    });
    if (typeof tweets === 'undefined') {
      throw new UnauthorizedException('ツイートが見つかりませんでした。');
    }

    try {
      await this.tweetRepository.delete(tweets);
      return true;
    } catch {
      throw new UnauthorizedException('ツイートを削除出来ませんでした。');
    }
  }

  async allDelete(payload: JwtPayload): Promise<boolean> {
    try {
      await this.tweetRepository.delete({ userid: payload.userId });
      return true;
    } catch {
      throw new UnauthorizedException('ツイートを削除出来ませんでした。');
    }
  }
}
