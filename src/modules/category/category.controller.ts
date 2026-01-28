import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

const getCategory = async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await categoryService.getCategory();
    res.status(200).json({
      result
    });
  }catch(err){
    next(err);
  }
}
const getCategoryPublic = async(req:Request, res: Response, next: NextFunction)=>{
  try{
    const result = await categoryService.getCategoryPublic();
    res.status(201).json({
      result
    });
  }catch(err){
    next(err)
  }
}

const createCategory = async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      result
    });
  }catch(err){
    next(err);
  }
}
const updateCategory = async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const {id} = req.params;
    const result = await categoryService.updateCategory(id as string, req.body);
    res.status(201).json({
      result
    });
  }catch(err){
    next(err);
  }
}

const deleteCategory = async (req: Request, res: Response, next: NextFunction)=>{
  try{
    const {id} = req.params;
    const result = await categoryService.deleteCategory(id as string);
    res.status(201).json({
      result
    });
  }catch(err){
    next(err);
  }
}

export const categoryController = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryPublic
}