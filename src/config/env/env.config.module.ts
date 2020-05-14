import { DynamicModule, Module } from '@nestjs/common';
import { EnvConfigService } from './env.config.service';
import { ENV_CONFIG_OPTIONS } from './constants';

export interface ConfigModuleOptions {
  folder: string;
}

@Module({})
export class EnvConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: EnvConfigModule,
      providers: [
        {
          provide: ENV_CONFIG_OPTIONS,
          useValue: options,
        },
        EnvConfigService,
      ],
      exports: [EnvConfigService],
    };
  }
}
