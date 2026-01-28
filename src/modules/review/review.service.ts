import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

const getReview = async(paramId:string)=>{
  return await prisma.review.findMany({
    where:{
      tutorId: paramId
    }
  });
}

const createReview = async(userId:string, paramId:string, data:Omit<Review, 'id' | 'createdAt' | 'studentId' | "tutorId">)=>{
  const bookingData = await prisma.booking.findFirst({
    where:{
      studentId: userId,
      tutorId: paramId
    },
    select:{
      status:true
    }
  });
  const result = await prisma.review.create({
    data:{
      ...data,
      studentId:userId,
      tutorId: paramId
    }
  });
  return result;
}



export const reviewService = {
  getReview,
  createReview
}