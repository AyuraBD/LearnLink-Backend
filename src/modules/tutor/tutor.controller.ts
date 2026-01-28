import { NextFunction, Request, Response } from "express";
import { tutorService } from "./tutor.service";
import { number } from "better-auth/*";

const getTutorProfile = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    // const {search} = req.params;
    // const searchString = typeof search === 'string' ? search : undefined;
    // const rating = req.params.rating as number | undefined;
    // const price = req.params.price  as number | undefined;
    // const category = req.params.category as string | undefined;
    const result = await tutorService.getTutorProfile();
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

const getTutorDetails = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const {id} = req.params;
    const result = await tutorService.getTutorDetails(id as string);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

const createTutorProfile = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const result = await tutorService.createTutorProfile(user?.id as string, req.body);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

const updateTutorProfile = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const result = await tutorService.updateTutorProfile(user?.id as string, req.body);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

const deleteTutorProfile = async(req: Request, res: Response, next: NextFunction)=>{
  try{
    const user = req.user;
    const result = await tutorService.deleteTutorProfile(user?.id as string);
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}

export const tutorController = {
  getTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
  getTutorDetails
}