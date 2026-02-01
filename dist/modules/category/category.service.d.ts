import { Category } from "../../../generated/prisma/client";
export declare const categoryService: {
    createCategory: (data: Omit<Category, "id" | "createdAt">) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        subject: string;
        description: string | null;
    }>;
    getCategory: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        subject: string;
        description: string | null;
    }[]>;
    updateCategory: (paramId: string, data: Partial<Category>) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        subject: string;
        description: string | null;
    }>;
    deleteCategory: (paramId: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        subject: string;
        description: string | null;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map