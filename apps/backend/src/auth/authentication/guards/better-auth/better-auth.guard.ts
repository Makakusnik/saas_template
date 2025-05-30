import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from '../../decorators/public.decorator';
import { OPTIONAL_KEY } from '../../decorators/optional.decorator';

@Injectable()
export class BetterAuthGuard extends AuthGuard('better-auth') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.get(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const isOptional = this.reflector.get(OPTIONAL_KEY, context.getHandler());

    if (isOptional && !request.session) return true;

    if (!request.session) throw new UnauthorizedException();

    return true;
  }
}
