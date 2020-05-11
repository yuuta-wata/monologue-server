import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  // DBの接続設定
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // 開発用
    return {
      type: 'postgres',
      host: this.configService.get('TYPEORM_HOST'),
      port: Number(this.configService.get('TYPEORM_PORT')),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      database: this.configService.get('TYPEORM_DATABASE'),
      entities: ['dist/src/**/*.entity.js'],
      synchronize: true,
    };
  }
}
