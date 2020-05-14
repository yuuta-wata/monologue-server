import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { ENV_CONFIG_OPTIONS } from './constants';
import { EnvConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class EnvConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(ENV_CONFIG_OPTIONS) options: EnvConfigOptions) {
    const filePath = '.env';
    const envFile = path.resolve(
      __dirname,
      '../../../',
      options.folder,
      filePath,
    );
    console.log('filePath: ' + filePath);
    console.log('options.folder: ' + options.folder);
    console.log('envFile: ' + envFile);

    console.log('fs: ' + fs.readFileSync(envFile));
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
