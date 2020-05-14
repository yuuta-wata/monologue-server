import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginInput } from '../users/input/loginInput';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext) {
    // GraphQLからContextを取得
    const ctx = GqlExecutionContext.create(context);
    const gqlResponse: Response = ctx.getContext().res;

    // LoginInputの値を取得し、DBに保存されている値と一致するか検証
    const { email, password }: LoginInput = ctx.getArgs().loginInput;
    const verifiedUsers = await this.usersService.validateUsers(
      email,
      password,
    );

    // アクセストークンを生成し、保存
    const accessToken = await this.authService.createAccessToken(verifiedUsers);
    return await this.authService.saveAccessToken(gqlResponse, accessToken);
  }
}
