import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getUser = async()=>{
  return await prisma.user.findMany();
}
const updateUser = async(paramId:string, data:Partial<User>)=>{
  return await prisma.user.update({
    where:{
      id:paramId
    },
    data
  })
}
export const userService = {
  getUser,
  updateUser
}