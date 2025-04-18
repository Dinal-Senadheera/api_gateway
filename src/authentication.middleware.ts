import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Public routes that don't require authentication
    const publicRoutes = ['/api/auth/google', '/api/auth/google/callback'];
    console.log('Request URL:', req.originalUrl);
    if (publicRoutes.some((route) => req.originalUrl.includes(route))) {
      return next();
    }

    let token: string | undefined = undefined;

    // First check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
    // If no Authorization header, check for cookie
    else if (req.cookies && req.cookies.auth_token) {
      token = req.cookies.auth_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: `Authentication required`,
      });
    }

    try {
      // Verify token manually using jsonwebtoken package
      const secret = process.env.JWT_SECRET;
      const payload = jwt.verify(token, secret);

      // Add user info to request for downstream services
      req['user'] = payload;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication',
      });
    }
  }
}
