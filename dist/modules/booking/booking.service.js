"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const prisma_1 = require("../../lib/prisma");
const auth_1 = require("../../middleware/auth");
const getBooking = async (userId, userRole) => {
    if (userRole === auth_1.UserRole.ADMIN) {
        const bookingForAdmin = await prisma_1.prisma.booking.findMany({
            select: {
                id: true,
                sessionDate: true,
                status: true,
                student: {
                    select: {
                        name: true,
                        phone: true
                    }
                },
                tutor: {
                    select: {
                        hourlyRate: true,
                        experience: true,
                        category: {
                            select: {
                                subject: true
                            }
                        }
                    }
                }
            }
        });
        return bookingForAdmin;
    }
    else if (userRole === auth_1.UserRole.TUTOR) {
        const tutorData = await prisma_1.prisma.tutorProfile.findUniqueOrThrow({
            where: {
                userId
            },
            select: {
                id: true
            }
        });
        const bookingForTutor = await prisma_1.prisma.booking.findMany({
            where: {
                tutorId: tutorData.id
            },
            select: {
                id: true,
                sessionDate: true,
                status: true,
                student: {
                    select: {
                        name: true,
                        phone: true
                    }
                }
            }
        });
        return bookingForTutor;
    }
    else if (userRole === auth_1.UserRole.STUDENT) {
        const bookingForStudent = await prisma_1.prisma.booking.findMany({
            where: {
                studentId: userId
            },
            select: {
                id: true,
                sessionDate: true,
                status: true,
                createdAt: true,
                tutor: {
                    select: {
                        id: true,
                        user: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                }
            }
        });
        return bookingForStudent;
    }
    else {
        throw new Error("Unauthorized");
    }
};
const createBooking = async (userId, paramId, data) => {
    const result = await prisma_1.prisma.booking.create({
        data: {
            ...data,
            studentId: userId,
            tutorId: paramId
        }
    });
    if (!result) {
        return { data: null, error: { message: "Couldn't book a session" } };
    }
    return { data: result, error: null };
};
const updateBooking = async (userId, paramId, data) => {
    const bookingData = await prisma_1.prisma.booking.findUnique({
        where: {
            id: paramId
        },
        select: {
            id: true,
            tutorId: true,
            tutor: {
                select: {
                    user: {
                        select: {
                            id: true,
                            role: true
                        }
                    }
                }
            }
        }
    });
    if (bookingData?.tutor.user.role !== auth_1.UserRole.TUTOR) {
    }
    if (bookingData?.tutor.user.id !== userId) {
        throw new Error("Forbidden access");
    }
    return await prisma_1.prisma.booking.update({
        where: {
            id: paramId
        },
        data
    });
};
exports.bookingService = {
    getBooking,
    createBooking,
    updateBooking
};
//# sourceMappingURL=booking.service.js.map