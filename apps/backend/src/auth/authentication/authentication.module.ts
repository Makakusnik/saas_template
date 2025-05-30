import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { createBodyParsingAuthMiddleware } from './middleware/auth.middleware';
import { toNodeHandler } from 'better-auth/node';
import { ConfigModule } from '@nestjs/config';
import authConfig from './config/authentication.config';
import databaseConfig from '@db/config/database.config';
import { DatabaseService } from '@db/database.service';

@Module({
  imports: [ConfigModule.forFeature(authConfig), ConfigModule.forFeature(databaseConfig)],
  providers: [AuthenticationService, DatabaseService],
  exports: [AuthenticationService],
})
export class AuthenticationModule implements NestModule {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * Custom middleware to ignore "body-parse" for auth endpoint only.
   * @param consumer
   */
  configure(consumer: MiddlewareConsumer) {
    /**
     * Add support for Better-Auth by ignoring "parse"
     */
    consumer.apply(createBodyParsingAuthMiddleware(this.authenticationService.config.basePath!)).forRoutes('*path');

    /**
     * Create routers
     */
    consumer.apply(toNodeHandler(this.authenticationService.auth)).forRoutes({
      path: `${this.authenticationService.config.basePath}/*path`,
      method: RequestMethod.ALL,
    });
  }
}
