// auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    // console.log (token)

    // Send the token to localhost:3000 for validation
    try {
      const response = await axios.post('http://localhost:3000/auth/check', {
        token,
      });

      if (response.status === 200) {
        // Token is valid, allow the request to continue
        next();
      } else {
        // Token is invalid, send a 401 Unauthorized response
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error validating token:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
