import * as express from 'express';
import type { Request, Response, NextFunction } from 'express';

/**
 * Skips body parsing for BetterAuth to handle raw request bodies.
 * Matches paths like /basePath/* or /api/basePath/*, but not /basePath or /basePath/.
 */
export function createBodyParsingAuthMiddleware(basePath: string) {
  const regexPath = new RegExp(`/${basePath.replace(/^\/+|\/+$/g, '')}/.+`);

  return (req: Request, res: Response, next: NextFunction) => {
    if (regexPath.test(req.baseUrl)) {
      return next();
    }

    express.json()(req, res, (err) => {
      if (err) return next(err);
      express.urlencoded({ extended: true })(req, res, next);
    });
  };
}
