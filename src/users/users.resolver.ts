import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { UsersService } from './users.service';
import { RegisterInput } from './input/registerInput';
import { UsersDto } from './dto/users.dto';
import { LoginInput } from './input/loginInput';
import { UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/auth/LoginGuards';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

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
}
