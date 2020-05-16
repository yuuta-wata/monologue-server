import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { RegisterInput } from './input/registerInput';
import { LoginInput } from './input/loginInput';
import { LoginGuard } from '../auth/LoginGuards';
import { GetToken } from '../customDecorator/getToken';
import { AuthService } from '../auth/auth.service';
import { Users } from './entity/users.entity';
import { DeleteAccountInput } from './input/deleteAccountInput';
import { TweetService } from '../tweet/tweet.service';

interface MyContext {
  res: Response;
  req: Request;
}

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly tweetService: TweetService,
  ) {}

  @Query(() => [Users])
  async getAllUsers() {
    return await this.usersService.allUsers();
  }

  @Mutation(() => Boolean)
  async usersRegister(
    @Args('registerInput') { nickname, email, password }: RegisterInput,
  ) {
    return await this.usersService.newRegister(nickname, email, password);
  }

  @Mutation(() => Boolean)
  @UseGuards(LoginGuard)
  async usersLogin(@Args('loginInput') {}: LoginInput) {
    return true;
  }

  @Mutation(() => Boolean)
  async logOut(@Context() ctx: MyContext, @GetToken() token: string) {
    return await this.authService.clearCookiesToken(ctx.res, token);
  }

  @Mutation(() => String)
  async deleteAccount(
    @Args('DeleteAccountInput')
    { nickname, email, password }: DeleteAccountInput,
    @GetToken() token: string,
    @Context() ctx: MyContext,
  ) {
    const payload = await this.authService.verify(token);
    // アカウントを削除する
    await this.usersService.accountDeleting(nickname, email, password);
    // 特定したユーザーの全ツイートを削除
    await this.tweetService.allDelete(payload);
    // クッキー削除
    await this.authService.clearCookiesToken(ctx.res, token);
    return 'アカウントを削除しました。';
  }
}
