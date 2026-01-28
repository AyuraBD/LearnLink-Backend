import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"

const createBooking = async(userId:string, paramId:string, data:Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>)=>{
  const result = await prisma.booking.create({
    data:{
      ...data,
      studentId:userId,
      tutorId: paramId
    }
  });
  return result;
}

export const bookingService = {
  createBooking
}