import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  AUTH_ENDPOINT = process.env.AUTH_ENDPOINT;

  async use(req: Request, res: Response, next: NextFunction) {
    console.log('redirecting to authenticaiton service');
    const jwtResponse = await axios.post(
      `${this.AUTH_ENDPOINT}/api/auth/login`,
      {
        token: req.headers.authorization,
      },
    );

    const jwt = jwtResponse.data;

    if (!jwt) {
      return res.status(401).send('Unauthorized');
    }

    req.headers.authorization = jwt;
    next();
  }
}
