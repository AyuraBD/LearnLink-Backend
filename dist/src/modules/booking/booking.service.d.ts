import { Booking } from "../../../generated/prisma/client";
export declare const bookingService: {
    getBooking: (userId: string, userRole: string) => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").BookingStatus;
        student: {
            name: string;
            phone: string | null;
        };
        sessionDate: Date;
    }[] | {
        id: string;
        createdAt: Date;
        tutor: {
            user: {
                name: string;
                image: string | null;
            };
            id: string;
        };
        status: import("../../../generated/prisma/enums").BookingStatus;
        sessionDate: Date;
    }[]>;
    createBooking: (userId: string, paramId: string, data: Omit<Booking, "id" | "createdAt" | "updatedAt">) => Promise<{
        data: null;
        error: {
            message: string;
        };
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../../../generated/prisma/enums").BookingStatus;
            studentId: string;
            tutorId: string;
            sessionDate: Date;
        };
        error: null;
    }>;
    updateBooking: (userId: string, paramId: string, data: Partial<Booking>) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("../../../generated/prisma/enums").BookingStatus;
        studentId: string;
        tutorId: string;
        sessionDate: Date;
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map