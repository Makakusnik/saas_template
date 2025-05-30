import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CaslAbilityFactory } from './casl-ability.factory';
import { AppAbility } from './types/authorization.types';
import { User } from '@authentication/config/better-auth.config';

@Injectable({ scope: Scope.REQUEST })
export class AbilityProvider {
  private ability: AppAbility;

  constructor(
    @Inject(REQUEST) private request: Request & { user?: User },
    private caslAbilityFactory: CaslAbilityFactory,
  ) {
    const user = this.request.user;

    if (!user) {
      throw new Error('User not found on request');
    }

    this.ability = this.caslAbilityFactory.createForUser(user);
  }

  getAbility(): AppAbility {
    return this.ability;
  }
}
