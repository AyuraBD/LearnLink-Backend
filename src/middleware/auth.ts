import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum UserRole{
  STUDENT = "STUDENT",
  ADMIN = "ADMIN",
  TUTOR = "TUTOR"
}

declare global {
  namespace Express{
    interface Request{
      user?:{
        id: string;
        email: string;
        role: string;
        emailVerified: boolean;
      }
    }
  }
}

const authMiddleware = (...roles:UserRole[])=>{
  return async(req: Request, res: Response, next: NextFunction) =>{
    try{
      const session = await auth.api.getSession({
        headers: req.headers as any
      });
      if(!session){
        return res.status(401).json({
          message: "Unauthorized"
        })
      }
      if(!session.user.emailVerified){
        return res.status(401).json({
          message: "Email Verification is required."
        })
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      }
      if(roles.length && !roles.includes(req.user.role as UserRole)){
        return res.status(401).json({
          message: "Forbidden access"
        })
      }
      next();
    }catch(err:any){
      next(err.message);
    }
  }
}

export default authMiddleware