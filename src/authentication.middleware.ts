import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  async use(req: Request, res: Response, next: NextFunction) {
    // Public routes that don't require authentication
    const publicRoutes = [
      '/api/auth/google',
      '/api/auth/google/callback',
      '/api/auth/success',
    ];

    this.logger.debug(`Request URL: ${req.originalUrl}`);
    this.logger.debug(
      `Cookies received in middleware: ${JSON.stringify(req.cookies)}`,
    );

    if (publicRoutes.some((route) => req.originalUrl.includes(route))) {
      this.logger.debug(`Public route detected: ${req.originalUrl}`);
      return next();
    }

    let token: string | undefined = undefined;
    this.logger.debug(`Headers of checked req: ${JSON.stringify(req.headers)}`);

    // First check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      this.logger.debug('Token found in Authorization header');
    }
    // If no Authorization header, check for cookie
    else if (req.cookies && req.cookies.auth_token) {
      this.logger.debug('Found token in cookies');
      token = req.cookies.auth_token;
    }

    if (!token) {
      this.logger.warn(
        `Authentication failed: No token provided for ${req.originalUrl}`,
      );
      return res.status(401).json({
        success: false,
        message: `Authentication required`,
      });
    }

    try {
      // Verify token manually using jsonwebtoken package
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      // Add user info to request for downstream services
      req['user'] = payload;
      this.logger.debug(
        `Authentication successful for user ID: ${(payload as any).id || 'unknown'}`,
      );
      next();
    } catch (error) {
      this.logger.error(`Error verifying token: ${error.message}`, error.stack);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication',
      });
    }
  }
}
