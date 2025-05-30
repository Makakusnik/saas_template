import { betterAuth, BetterAuthOptions } from 'better-auth';
import { Pool } from 'pg';
import authConfig from './authentication.config';
import { ConfigType } from '@nestjs/config';
import databaseConfig from '@db/config/database.config';

export const getBetterAuthConfig = (authEnvConfig?: ConfigType<typeof authConfig>, dbEnvConfig?: ConfigType<typeof databaseConfig>): BetterAuthOptions => {
  let secret = process.env.BETTER_AUTH_SECRET!;
  let baseUrl = process.env.BETTER_AUTH_BASE_URL!;
  let trustedOrigin = process.env.FRONTEND_WEB_URL!;
  let databaseUrl = process.env.DATABASE_URL!;
  let googleClientId = process.env.GOOGLE_WEB_CLIENT_ID!;
  let googleClientSecret = process.env.GOOGLE_WEB_CLIENT_SECRET!;
  let googleRedirectURI = process.env.GOOGLE_WEB_CLIENT_REDIRECT_URI!;

  if (authEnvConfig && dbEnvConfig) {
    secret = authEnvConfig.secret!;
    baseUrl = authEnvConfig.baseUrl!;
    trustedOrigin = authEnvConfig.trustedOrigin!;
    databaseUrl = dbEnvConfig.url!;
    googleClientId = authEnvConfig.googleClientId!;
    googleClientSecret = authEnvConfig.googleClientSecret!;
    googleRedirectURI = authEnvConfig.googleRedirectURI!;
  }

  return {
    secret: secret,
    baseURL: baseUrl,
    trustedOrigins: [trustedOrigin],
    database: new Pool({ connectionString: databaseUrl }),
    socialProviders: {
      google: {
        enabled: true,
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        redirectURI: googleRedirectURI,
      },
    },
    basePath: '/auth',
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: false,
        },
      },
    },
    advanced: {
      database: {
        generateId: false,
      },
    },
    session: {},
  } as const;
};

export type Session = typeof auth.$Infer.Session;
export type User = Session['user'] & {
  role: string;
};

export const auth = betterAuth(getBetterAuthConfig());
