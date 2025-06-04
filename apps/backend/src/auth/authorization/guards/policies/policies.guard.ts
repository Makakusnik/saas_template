import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '@authorization/casl-ability.factory';
import { PolicyHandler } from '@authorization/handlers/policy.handler';
import { CHECK_POLICIES_KEY } from '@authorization/decorators/check-policies.decorator';
import { AppAbility } from '@authorization/types/authorization.types';
import { PUBLIC_KEY } from '@authentication/decorators/public.decorator';
import { OPTIONAL_KEY } from '@authentication/decorators/optional.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    const isOptional = this.reflector.getAllAndOverride<boolean>(OPTIONAL_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      if (policyHandlers.length > 0) {
        throw new Error('Public routes should not have policy handlers.');
      }

      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    const ability = this.caslAbilityFactory.createForUser(user);

    if (isOptional) {
      if (policyHandlers.length > 0) {
        throw new Error('Optional routes should have policy handlers at service layer not controller, for more granular control (checking ID or other properties of user).');
      }

      return true;
    }

    return policyHandlers.every((handler) => this.execPolicyHandler(handler, ability));
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
