import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tweet } from './entity/tweet.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), AuthModule],
  providers: [TweetService, TweetResolver],
})
export class TweetModule {}
