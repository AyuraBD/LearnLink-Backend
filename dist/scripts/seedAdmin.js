"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../lib/prisma");
const auth_1 = require("../middleware/auth");
async function seedAdmin() {
    try {
        const adminData = {
            name: "Mr. Admin",
            email: "admin@gmail.com",
            password: "admin1234",
            role: auth_1.UserRole.ADMIN
        };
        console.log(adminData);
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                email: adminData.email
            }
        });
        if (existingUser) {
            throw new Error("User is already exist");
        }
        const res = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(adminData)
        });
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
            throw new Error("Admin creating failed");
        }
        await prisma_1.prisma.user.update({
            where: {
                email: adminData.email
            },
            data: {
                emailVerified: true
            }
        });
        console.log(res);
        console.log("User created successully");
    }
    catch (err) {
        console.log(err);
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map