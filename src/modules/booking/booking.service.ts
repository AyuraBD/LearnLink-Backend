import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

const getBooking = async(userId:string, userRole: string)=>{
  if(userRole === UserRole.TUTOR){
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
  }
  if(userRole === UserRole.STUDENT){
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
  }
}

const createBooking = async(userId:string, paramId:string, data:Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>)=>{
  const result = await prisma.booking.create({
    data:{
      ...data,
      studentId:userId,
      tutorId: paramId
    }
  });
  console.log(result)
  return result;
}

export const bookingService = {
  getBooking,
  createBooking
}