import { Inject, Injectable } from '@nestjs/common';

import { betterAuth, type BetterAuthOptions } from 'better-auth';
import { ConfigType } from '@nestjs/config';
import authConfig from './config/authentication.config';
import { getBetterAuthConfig } from './config/better-auth.config';
import databaseConfig from '@db/config/database.config';

@Injectable()
export class AuthenticationService {
  public readonly config: BetterAuthOptions;
  public readonly auth: ReturnType<typeof betterAuth>;

  constructor(
    @Inject(authConfig.KEY)
    private authConfiguration: ConfigType<typeof authConfig>,
    @Inject(databaseConfig.KEY)
    private databaseConfiguration: ConfigType<typeof databaseConfig>,
  ) {
    this.config = getBetterAuthConfig(authConfiguration, databaseConfiguration);

    this.auth = betterAuth(this.config);
  }
}
