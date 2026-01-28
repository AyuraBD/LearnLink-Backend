import { Category } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const getCategory = async () =>{
  const res = await prisma.category.findMany();
  return res;
}
const createCategory = async(data: Omit<Category, 'id' | 'createdAt'>)=>{
  const res = await prisma.category.create({
    data
  })
  console.log(res);
  return res;
}
const updateCategory = async(paramId:string,data: Partial<Category>)=>{
  return await prisma.category.update({
    where:{
      id: paramId
    },
    data
  });
}
const deleteCategory = async(paramId:string)=>{
  return await prisma.category.delete({
    where:{
      id: paramId
    }
  });
}

export const categoryService = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
}