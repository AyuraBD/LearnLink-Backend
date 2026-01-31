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
  // console.log(userId, paramId, data)
  const bookingData = await prisma.booking.findFirst({
    where:{
      studentId: userId,
      id: paramId
    },
    select:{
      status:true,
      tutor:{
        select:{
          id:true
        }
      }
    }
  });
  console.log(bookingData)
  // if(bookingData?.status !== "CONFIRMED"){
  //   throw new Error("Your booking have to be confirmed")
  // }
  console.log("Hit", data);
  const result = await prisma.review.create({
    data:{
      ...data,
      studentId:userId,
      tutorId: bookingData?.tutor.id
    }
  });
  console.log('Anything:',result);
  if(result){
    await prisma.booking.update({
      where:{
        id:paramId
      },
      data:{
        status: "COMPLETED"
      }
    })
  }
  return result;
}

export const reviewService = {
  getReview,
  createReview,
  getOwnReview
}