import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { TweetService } from './tweet.service';
import { Tweet } from './entity/tweet.entity';
import { TweetInput } from './input/tweetInput';
import { GetToken } from '../customDecorator/getToken';
import { AuthService } from '../auth/auth.service';

@Resolver('Tweet')
export class TweetResolver {
  constructor(
    private readonly tweetService: TweetService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [Tweet])
  async getAllTweet() {
    return this.tweetService.allTweet();
  }

  @Query(() => [Tweet])
  async getTweet(@GetToken() token: string) {
    const payload = await this.authService.verify(token);
    return await this.tweetService.tweet(payload);
  }

  @Mutation(() => Boolean)
  async createTweet(
    @Args('tweetInput') { tweet }: TweetInput,
    @GetToken() token: string,
  ) {
    const payload = await this.authService.verify(token);
    return await this.tweetService.create(payload, tweet);
  }

  @Mutation(() => Boolean)
  async deleteTweet(
    @Args('tweetId') tweetId: number,
    @GetToken() token: string,
  ) {
    const payload = await this.authService.verify(token);
    return await this.tweetService.delete(tweetId, payload);
  }
}
