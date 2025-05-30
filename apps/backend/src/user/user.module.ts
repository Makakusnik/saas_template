import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { DatabaseModule } from '@db/database.module';
import { AuthorizationModule } from '@authorization/authorization.module';
@Module({
  imports: [DatabaseModule, AuthorizationModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
