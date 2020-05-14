import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';

import { UsersService } from './users.service';
import { RegisterInput } from './input/registerInput';
import { UsersDto } from './dto/users.dto';
import { LoginInput } from './input/loginInput';
import { LoginGuard } from '../auth/LoginGuards';
import { GetToken } from '../customDecorator/getToken';
import { AuthService } from '../auth/auth.service';

interface MyContext {
  res: Response;
  req: Request;
}

@Resolver('Users')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => [UsersDto])
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
}
