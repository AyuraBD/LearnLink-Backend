import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

const getReview = async(userId:string, userRole: string)=>{
  if(userRole === UserRole.ADMIN){
    const bookingForAdmin = await prisma.booking.findMany({
      select:{
        sessionDate:true,
        status: true,
        student:{
          select:{
            name:true,
            phone:true
          }
        },
        tutor:{
          select:{
            hourlyRate:true,
            experience:true,
            category:{
              select:{
                subject:true
              }
            }
          }
        }
      }
    });
    return bookingForAdmin;
  } else if(userRole === UserRole.TUTOR){
    const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
      where:{
        userId
      },
      select:{
        id: true
      }
    })
    const bookingForTutor = await prisma.booking.findMany({
      where:{
        tutorId: tutorData.id
      },
      select:{
        sessionDate:true,
        status: true,
        student:{
          select:{
            name:true,
            phone:true
          }
        }
      }
    });
    return bookingForTutor;
  }else if(userRole === UserRole.STUDENT){
    const bookingForStudent = await prisma.booking.findMany({
      where:{
        studentId: userId
      },
      select:{
        sessionDate:true,
        status: true,
        tutor:{
          select:{
            user:{
              select:{
                name:true,
                image: true
              }
            }
          }
        }
      }
    });
    return bookingForStudent;
  } else{
    throw new Error("Unauthorized");
  }
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