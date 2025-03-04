import { Request, Response } from 'express';
import { secretKey } from '../../server';
import jwt from 'jwt-simple';

export function checkAuthStatus(req:any, res:any) {
    try {
      const token = req.cookies.user;
      if (!token) {
        return res.send({ isLoggedIn: false });
      }
  
      const decoded = jwt.decode(token, secretKey);
      return res.send({ isLoggedIn: true, user: decoded });
    } catch (error) {
      return res.send({ isLoggedIn: false });
    }
  }
  