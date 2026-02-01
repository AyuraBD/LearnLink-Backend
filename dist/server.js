"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const prisma_1 = require("./lib/prisma");
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await prisma_1.prisma.$connect();
        app_1.default.listen(PORT, () => {
            console.log(`Express server is running on port: ${PORT}`);
        });
    }
    catch (err) {
        console.log(`Error occured:`, err.message);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map