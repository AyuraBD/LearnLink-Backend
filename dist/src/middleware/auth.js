import { auth } from "../lib/auth";
export var UserRole;
(function (UserRole) {
    UserRole["STUDENT"] = "STUDENT";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["TUTOR"] = "TUTOR";
})(UserRole || (UserRole = {}));
const authMiddleware = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await auth.api.getSession({
                headers: req.headers
            });
            if (!session) {
                return res.status(401).json({
                    data: null, error: { message: "Unauthorized" }
                });
            }
            if (!session.user.emailVerified) {
                return res.status(401).json({
                    data: null, error: { message: "Email Verification is required." }
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                role: session.user.role,
                emailVerified: session.user.emailVerified
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({
                    data: null, error: { message: "Forbidden access" }
                });
            }
            next();
        }
        catch (err) {
            next(err.message);
        }
    };
};
export default authMiddleware;
//# sourceMappingURL=auth.js.map