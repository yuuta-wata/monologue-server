import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { Users } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  // アクセストークンを生成
  async createAccessToken(users: Users) {
    const token = this.jwtService.sign({
      userId: users.id,
      userEmail: users.email,
    });
    if (typeof token === 'undefined') {
      throw new UnauthorizedException(
        'アクセストークンを生成出来ませんでした。',
      );
    }
    return token;
  }

  // アクセストークンをCookieに保存する
  async saveAccessToken(res: Response, accessToken: string) {
    try {
      res.cookie('jid', accessToken);
      return true;
    } catch {
      throw new UnauthorizedException(
        'アクセストークンを保存出来ませんでした。',
      );
    }
  }

  // アクセストークンを削除する
  async clearCookiesToken(res: Response, token: string) {
    try {
      res.clearCookie('jid', token);
      return true;
    } catch {
      throw new UnauthorizedException('Cookieを削除出来ませんでした。');
    }
  }

  // トークンを検証
  async verify(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('再度ログインしてください。');
    }
  }
}
