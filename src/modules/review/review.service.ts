import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const getReview = async(paramId:string)=>{
  return await prisma.review.findMany({
    where:{
      tutorId: paramId
    }
  });
}

const getOwnReview = async(id:string)=>{
  const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
    where:{
      userId: id
    },
    select:{
      id:true
    }
  })
  return await prisma.review.findMany({
    where:{
      tutorId: tutorData.id
    },
    select:{
      id:true,
      rating: true,
      comment:true,
      student:{
        select:{
          name:true
        }
      },
      tutor:{
        select:{
          category:{
            select:{
              name:true,
              subject:true,
            }
          }
        }
      }
    }
  })
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
  createReview,
  getOwnReview
}