import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";

const getBooking = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    console.log(user)
    const result = await bookingService.getBooking(user?.id as string, user?.role as string);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}
const createBooking = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const {id} = req.params;
    const result = await bookingService.createBooking(user?.id as string, id as string, req.body);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

export const bookingController = {
  getBooking,
  createBooking
}

