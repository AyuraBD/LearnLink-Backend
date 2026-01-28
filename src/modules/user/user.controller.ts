import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const getUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await userService.getUser();
    res.status(200).json({
      result
    })
  }catch(err){
    next(err);
  }
}

const updateUser = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const {id}= req.params;
    const data = req.body;
    const result = await userService.updateUser(id as string, data);
    res.status(200).json({
      result
    })
  }catch(err){
    next(err);
  }
}

export const userController = {
  getUser,
  updateUser
}