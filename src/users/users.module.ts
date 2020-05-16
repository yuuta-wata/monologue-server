import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { AuthModule } from '../auth/auth.module';
import { TweetModule } from '../tweet/tweet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule, TweetModule],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
