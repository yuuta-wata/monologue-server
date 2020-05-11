import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entity/users.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async allUsers(): Promise<Users[]> {
    return this.usersRepository.find();
  }

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
}
