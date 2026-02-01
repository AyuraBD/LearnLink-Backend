export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly TUTOR: "TUTOR";
    readonly STUDENT: "STUDENT";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const Status: {
    readonly ACTIVE: "ACTIVE";
    readonly BAN: "BAN";
    readonly UNBAN: "UNBAN";
};
export type Status = (typeof Status)[keyof typeof Status];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const Availability: {
    readonly AVAILABLE: "AVAILABLE";
    readonly NOT_AVAILABLE: "NOT_AVAILABLE";
};
export type Availability = (typeof Availability)[keyof typeof Availability];
//# sourceMappingURL=enums.d.ts.map