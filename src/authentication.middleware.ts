import { Injectable, NestMiddleware } from '@nestjs/common';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  AUTH_ENDPOINT = process.env.AUTH_SERVICE_ENDPOINT;

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('redirecting to authenticaiton service');

      const jwtResponse = await axios({
        method: 'post',
        url: `${this.AUTH_ENDPOINT}`,
        data: req.body,
        headers: req.headers,
      });

      const jwt = jwtResponse.data;

      req.headers.authorization = jwt?.token;
      next();
    } catch (error) {
      console.log('error', error);
      return res.status(error?.response?.data?.statusCode || 500).send(
        {
          ...error?.response?.data
        || {message: 'Internal Server Error - Authentication Service Down'}},
      );
    }
  }
}
