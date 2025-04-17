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

    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token = not logged in
      return res.status(401).json({
        success: false,
        message: `Authentication required ${req.originalUrl}`,
      });
    }

    const token = authHeader.split(' ')[1];

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
