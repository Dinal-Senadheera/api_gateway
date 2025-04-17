import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Public routes that don't require authentication
    const publicRoutes = ['/api/auth/google', '/api/auth/google/callback'];
    if (publicRoutes.some((route) => req.path.startsWith(route))) {
      return next();
    }

    // Check for token in Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // No token = not logged in
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify token
      const payload = this.jwtService.verify(token);
      // Add user info to request for downstream services
      req['user'] = payload;
      next();
    } catch (error) {
      // Invalid token = not logged in
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authentication',
      });
    }
  }
}
