import { TutorProfile } from "../../../generated/prisma/client";
export declare const tutorService: {
    getTutorProfile: () => Promise<{
        user: {
            name: string;
            image: string | null;
        };
        id: string;
        bio: string;
        hourlyRate: number;
        experience: number;
        availability: import("../../../generated/prisma/enums").Availability;
        category: {
            name: string;
            subject: string;
            description: string | null;
        };
        reviews: {
            rating: number;
            comment: string | null;
        }[];
        _count: {
            reviews: number;
        };
    }[]>;
    createTutorProfile: (userId: string, data: Omit<TutorProfile, "id" | "createdAt" | "updatedAt" | "userId">) => Promise<Error | {
        id: string;
        userId: string;
    } | {
        data: null;
        error: {
            message: string;
        };
    }>;
    updateTutorProfile: (userId: string, data: Partial<TutorProfile>) => Promise<{
        id: string;
        userId: string;
    }>;
    deleteTutorProfile: (userId: string) => Promise<{
        id: string;
        userId: string;
    }>;
    getTutorDetails: (id: string) => Promise<{
        user: {
            name: string;
            image: string | null;
        };
        id: string;
        bio: string;
        hourlyRate: number;
        experience: number;
        availability: import("../../../generated/prisma/enums").Availability;
        category: {
            name: string;
            subject: string;
            description: string | null;
        };
        reviews: {
            id: string;
            createdAt: Date;
            rating: number;
            comment: string | null;
            studentId: string;
            tutorId: string;
        }[];
    }>;
    getOwnTutorDetails: (id: string) => Promise<{
        id: string;
        bio: string;
        hourlyRate: number;
        experience: number;
        availability: import("../../../generated/prisma/enums").Availability;
        category: {
            name: string;
            id: string;
            subject: string;
            description: string | null;
        };
    }>;
};
//# sourceMappingURL=tutor.service.d.ts.map