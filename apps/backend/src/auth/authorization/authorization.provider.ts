import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CaslAbilityFactory } from '@authorization/casl-ability.factory';
import { AppAbility } from '@authorization/types/authorization.types';
import { User } from '@authentication/config/better-auth.config';

@Injectable({ scope: Scope.REQUEST })
export class AbilityProvider {
  private ability: AppAbility;

  constructor(
    @Inject(REQUEST) private request: Request & { user?: User },
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
    const user = this.request?.user;

    this.ability = this.caslAbilityFactory.createForUser(user);
  }

  getAbility(): AppAbility {
    return this.ability;
  }
}
