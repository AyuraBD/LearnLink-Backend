import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

const getReview = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const result = await reviewService.getReview(user?.id as string, user?.role as string);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

const createReview = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {id} = req.params;
    const result = await reviewService.createReview(user?.id as string, id as string, req.body);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

export const reviewController = {
  getReview,
  createReview
}

