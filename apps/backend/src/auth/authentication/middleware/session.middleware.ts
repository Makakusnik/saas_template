import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { Session, User } from 'better-auth';
import { AuthenticationService } from '../authentication.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sessionData?: { session: Session; user: User } | null;
      session?: Session;
      user?: User;
    }
  }
}

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const sessionData = await this.authenticationService.auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      req.session = sessionData?.session;
      req.user = sessionData?.user;
    } catch (error) {
      console.error('Error fetching session in SessionMiddleware:', error);
    }

    next();
  }
}
