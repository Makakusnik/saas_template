import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AbilityProvider } from './authorization.provider';
import { AuthenticationModule } from '../authentication/authentication.module';

@Module({
  imports: [AuthenticationModule],
  exports: [CaslAbilityFactory, AbilityProvider],
  providers: [CaslAbilityFactory, AbilityProvider],
})
export class AuthorizationModule {}
