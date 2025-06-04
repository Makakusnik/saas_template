import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_KEY } from '@authentication/decorators/public.decorator';
import { OPTIONAL_KEY } from '@authentication/decorators/optional.decorator';

@Injectable()
export class BetterAuthGuard extends AuthGuard('better-auth') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const isOptional = this.reflector.getAllAndOverride<boolean>(OPTIONAL_KEY, [context.getHandler(), context.getClass()]);

    if (isOptional && !request.session) {
      return true;
    }

    if (!request.session) throw new UnauthorizedException();

    return true;
  }
}
