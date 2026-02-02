import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try{
    const adminData = {
      name: "Mr. Admin",
      email: "admin@gmail.com",
      password: "admin1234",
      role: UserRole.ADMIN
    }

    const existingUser = await prisma.user.findUnique({
      where:{
        email: adminData.email
      }
    });
    if(existingUser){
      throw new Error("User is already exist");
    }
    const res = await fetch("https://learnlink-iota.vercel.app/api/auth/sign-up/email", {
      method:"POST",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify(adminData)
    });
    const data = await res.json();

    if(!res.ok){
      throw new Error("Admin creating failed");
    }
    await prisma.user.update({
      where:{
        email: adminData.email
      },
      data:{
        emailVerified: true
      }
    });

  }catch(err){
    console.log(err);
  }
}

seedAdmin();