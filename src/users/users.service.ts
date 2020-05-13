import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async allUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  // 新規登録
  async newRegister(
    nickname: string,
    email: string,
    password: string,
  ): Promise<boolean> {
    const hashedPassword = await hash(password, 12);

    try {
      await this.usersRepository
        .create({
          nickname: nickname,
          email: email,
          password: hashedPassword,
        })
        .save();

      return true;
    } catch {
      console.error('users save error');
      return false;
    }
  }

  // ユーザー検証
  async validateUsers(
    inputEmail: string,
    inputPassword: string,
  ): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { email: inputEmail },
    });

    if (typeof user === 'undefined') {
      throw new UnauthorizedException('ユーザーが見つかりませんでした。');
    }

    const valid = await compare(inputPassword, user.password);
    if (!valid) {
      throw new UnauthorizedException('パスワードが間違ってます。');
    }

    return user;
  }
}
