import { TutorProfile } from "../../../generated/prisma/client";
import { TutorProfileWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma"
import { UserRole } from "../../middleware/auth";

const getTutorProfile = async() => {
  // const filterValues: TutorProfileWhereInput[] = [];
  
  // if(search){
  //   filterValues.push({
  //     OR:[
  //       {
  //         category: {
  //           name: {
  //             contains: search,
  //             mode: 'insensitive'
  //           }
  //         }
  //       },
        // {
        //   category: {
        //     subject:{
        //       contains: category,
        //       mode: 'insensitive'
        //     }
        //   }
        // },
        // {
        //   reviews:{
        //     rating:{
              
        //     }
        //   }
        // }
  //     ]
  //   });
  // }
  
  // if(rating){
  //   filterValues.push({
  //     rating: {
  //       gte: rating  // greater than or equal to the rating
  //     }
  //   });
  // }
  
  // if(price){
  //   filterValues.push({
  //     hourlyRate: {  // Changed from 'price' to 'hourlyRate' based on your select
  //       lte: price  // less than or equal to the price
  //     }
  //   });
  // }
  
  // if(category){
  //   filterValues.push({
  //     categoryId: category  // Assuming you have a categoryId foreign key
  //   });
  // }

  const result = await prisma.tutorProfile.findMany({
    // where: {
    //   AND: filterValues  // Changed from 'searchValues' to 'filterValues'
    // },
    select: {
      id: true,
      bio: true,
      hourlyRate: true,
      experience: true,
      availability: true,
      category: {
        select: {
          name: true,
          subject: true,
          description: true
        }
      },
      user:{
        select:{
          name:true,
          image:true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      },
      reviews: {
        select: {
          rating: true,
          comment: true
        }
      }
    }
  });
    return result;
  }

const getTutorDetails = async(id:string)=>{
  return await prisma.tutorProfile.findUniqueOrThrow({
    where:{
      id
    },
    select:{
      id:true,
      bio:true,
      hourlyRate:true,
      experience: true,
      availability: true,
      user:{
        select:{
          name:true,
          image:true
        }
      },
      category:{
        select:{
          name: true,
          subject: true,
          description: true
        }
      },
      reviews:true
    }
  });
  
}

const createTutorProfile = async(userId: string, data:Omit<TutorProfile, 'id' | 'createdAt' | 'updatedAt' | 'userId'>)=>{
  const userData = await prisma.user.findUniqueOrThrow({
    where:{
      id: userId
    },
    select:{
      role: true
    }
  });
  if (!userData) {
    throw new Error("User not found");
  }
  if(userData.role !== UserRole.TUTOR){
    throw new Error("You are not allowed to create a tutor profile");
  }
  const tutorData = await prisma.tutorProfile.findUnique({
    where:{
      userId
    }
  });

  if(tutorData){
    throw new Error("Tutor profile already exist");
  }
  
  return await prisma.tutorProfile.create({
    data:{
      ...data,
      userId,
    },
    select:{
      id:true,
      userId:true
    }
  });
}

const updateTutorProfile = async(userId:string, data:Partial<TutorProfile>)=>{
  const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
    where:{
      userId
    },
    select:{
      id:true,
      userId:true
    }
  });
  if (tutorData.userId !== userId) {
    throw new Error("Invalid access");
  }
  return await prisma.tutorProfile.update({
    where:{
      id: tutorData.id
    },
    data,
    select:{
      id:true,
      userId:true
    }
  });
}

const deleteTutorProfile = async(userId:string)=>{
  const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
    where:{
      userId
    },
    select:{
      id:true,
      userId:true
    }
  });
  if (tutorData.userId !== userId) {
    throw new Error("Invalid access");
  }
  return await prisma.tutorProfile.delete({
    where:{
      id: tutorData.id
    },
    select:{
      id:true,
      userId: true
    }
  });
}

export const tutorService = {
  getTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
  getTutorDetails
}