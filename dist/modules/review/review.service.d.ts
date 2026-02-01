import { Review } from "../../../generated/prisma/client";
export declare const reviewService: {
    getReview: (paramId: string) => Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        comment: string | null;
        studentId: string;
        tutorId: string;
    }[]>;
    createReview: (userId: string, paramId: string, data: Omit<Review, "id" | "createdAt" | "studentId" | "tutorId">) => Promise<{
        id: string;
        createdAt: Date;
        rating: number;
        comment: string | null;
        studentId: string;
        tutorId: string;
    } | undefined>;
    getOwnReview: (id: string) => Promise<{
        id: string;
        tutor: {
            category: {
                name: string;
                subject: string;
            };
        };
        rating: number;
        comment: string | null;
        student: {
            name: string;
        };
    }[]>;
};
//# sourceMappingURL=review.service.d.ts.map