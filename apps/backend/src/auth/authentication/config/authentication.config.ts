import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  baseUrl: process.env.BETTER_AUTH_BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigin: process.env.FRONTEND_WEB_URL,
  googleClientId: process.env.GOOGLE_WEB_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_WEB_CLIENT_SECRET,
  googleRedirectURI: process.env.GOOGLE_WEB_CLIENT_REDIRECT_URI,
}));
