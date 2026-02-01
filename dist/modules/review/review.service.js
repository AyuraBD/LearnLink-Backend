"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prisma_1 = require("../../lib/prisma");
const getReview = async (paramId) => {
    return await prisma_1.prisma.review.findMany({
        where: {
            tutorId: paramId
        }
    });
};
const getOwnReview = async (id) => {
    const tutorData = await prisma_1.prisma.tutorProfile.findUniqueOrThrow({
        where: {
            userId: id
        },
        select: {
            id: true
        }
    });
    return await prisma_1.prisma.review.findMany({
        where: {
            tutorId: tutorData.id
        },
        select: {
            id: true,
            rating: true,
            comment: true,
            student: {
                select: {
                    name: true
                }
            },
            tutor: {
                select: {
                    category: {
                        select: {
                            name: true,
                            subject: true,
                        }
                    }
                }
            }
        }
    });
};
const createReview = async (userId, paramId, data) => {
    const bookingData = await prisma_1.prisma.booking.findFirst({
        where: {
            studentId: userId,
            id: paramId
        },
        select: {
            status: true,
            tutor: {
                select: {
                    id: true
                }
            }
        }
    });
    console.log(bookingData);
    if (!bookingData) {
        return;
    }
    // if(bookingData?.status !== "CONFIRMED"){
    //   throw new Error("Your booking have to be confirmed")
    // }
    const result = await prisma_1.prisma.review.create({
        data: {
            ...data,
            studentId: userId,
            tutorId: bookingData?.tutor.id
        }
    });
    if (result) {
        await prisma_1.prisma.booking.update({
            where: {
                id: paramId
            },
            data: {
                status: "COMPLETED"
            }
        });
    }
    return result;
};
exports.reviewService = {
    getReview,
    createReview,
    getOwnReview
};
//# sourceMappingURL=review.service.js.map