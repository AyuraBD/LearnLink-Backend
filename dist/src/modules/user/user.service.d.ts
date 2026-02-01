import { User } from "../../../generated/prisma/client";
export declare const userService: {
    getUser: () => Promise<{
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        status: import("../../../generated/prisma/enums").Status;
    }[]>;
    updateUser: (paramId: string, data: Partial<User>) => Promise<{
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        status: import("../../../generated/prisma/enums").Status;
    }>;
    getMyUser: (id: string) => Promise<{
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        status: import("../../../generated/prisma/enums").Status;
    }>;
    updateOwnUser: (userId: string, data: Partial<User>) => Promise<{
        name: string;
        role: import("../../../generated/prisma/enums").Role;
        phone: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        status: import("../../../generated/prisma/enums").Status;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map