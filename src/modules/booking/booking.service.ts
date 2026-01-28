import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

const getBooking = async(userId:string, userRole: string)=>{
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

const updateBooking = async(userId:string, paramId:string, data:Partial<Booking>)=>{
  const bookingData = await prisma.booking.findUnique({
    where:{
      id:paramId
    },
    select:{
      id:true,
      tutorId:true,
      tutor:{
        select:{
          user:{
            select:{
              id:true,
              role: true
            }
          }
        }
      }
    }
  });
  if(bookingData?.tutor.user.role !== UserRole.TUTOR){
    console.log("Unauthorized");
  }
  if(bookingData?.tutor.user.id !== userId){
    throw new Error("Forbidden access");
  }
  return await prisma.booking.update({
    where:{
      id: paramId
    },
    data
  });
}

export const bookingService = {
  getBooking,
  createBooking,
  updateBooking
}