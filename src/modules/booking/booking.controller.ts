import { NextFunction, Request, Response } from "express";
import { bookingService } from "./booking.service";

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
  createBooking
}

