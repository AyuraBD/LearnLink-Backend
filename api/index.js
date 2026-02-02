var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express6 from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id            String   @id @default(uuid())\n  name          String\n  email         String\n  emailVerified Boolean  @default(false)\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  role          Role\n  status        Status   @default(ACTIVE)\n  phone         String?\n\n  bookings      Booking[]\n  tutorProfiles TutorProfile[]\n  reviews       Review[]\n\n  sessions Session[]\n  accounts Account[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nenum Role {\n  ADMIN\n  TUTOR\n  STUDENT\n}\n\nenum Status {\n  ACTIVE\n  BAN\n  UNBAN\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel Booking {\n  id          String        @id @default(uuid())\n  sessionDate DateTime\n  status      BookingStatus @default(PENDING)\n\n  studentId String\n  tutorId   String\n\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nmodel Category {\n  id          String  @id @default(uuid())\n  name        String\n  subject     String\n  description String?\n\n  tutor     TutorProfile[]\n  createdAt DateTime       @default(now())\n}\n\nmodel Review {\n  id      String  @id @default(uuid())\n  rating  Int\n  comment String?\n\n  studentId String\n  tutorId   String\n\n  student User         @relation(fields: [studentId], references: [id])\n  tutor   TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel TutorProfile {\n  id           String       @id @default(uuid())\n  bio          String\n  hourlyRate   Float\n  experience   Int\n  availability Availability\n\n  userId     String    @unique\n  user       User      @relation(fields: [userId], references: [id])\n  categoryId String\n  category   Category  @relation(fields: [categoryId], references: [id])\n  bookings   Booking[]\n  reviews    Review[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\nenum Availability {\n  AVAILABLE\n  NOT_AVAILABLE\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"enum","type":"Role"},{"name":"status","kind":"enum","type":"Status"},{"name":"phone","kind":"scalar","type":"String"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"tutorProfiles","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"sessionDate","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"BookingStatus"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"subject","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"CategoryToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"studentId","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"student","kind":"object","type":"User","relationName":"ReviewToUser"},{"name":"tutor","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"hourlyRate","kind":"scalar","type":"Float"},{"name":"experience","kind":"scalar","type":"Int"},{"name":"availability","kind":"enum","type":"Availability"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToTutorProfile"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification",
  Booking: "Booking",
  Category: "Category",
  Review: "Review",
  TutorProfile: "TutorProfile"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  status: "status",
  phone: "phone"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var BookingScalarFieldEnum = {
  id: "id",
  sessionDate: "sessionDate",
  status: "status",
  studentId: "studentId",
  tutorId: "tutorId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  subject: "subject",
  description: "description",
  createdAt: "createdAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  rating: "rating",
  comment: "comment",
  studentId: "studentId",
  tutorId: "tutorId",
  createdAt: "createdAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  bio: "bio",
  hourlyRate: "hourlyRate",
  experience: "experience",
  availability: "availability",
  userId: "userId",
  categoryId: "categoryId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/lib/auth.ts
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASS
  }
});
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        validate: (value) => ["STUDENT", "TUTOR"].includes(value) || "Invalid"
      },
      phone: {
        type: "string",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"LearnLink" <LearnLink@gmail.com>',
          to: user.email,
          subject: "Email Verification",
          url,
          html: `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title>Verify your email</title>
                            <style>
                                body {
                                background:#f5f7fb;
                                font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
                                margin:0;
                                padding:0;
                                }
                                .container {
                                max-width:540px;
                                margin:32px auto;
                                background:#ffffff;
                                border-radius:14px;
                                box-shadow:0 20px 40px rgba(0,0,0,.05);
                                padding:32px;
                                }
                                .logo {
                                font-size:20px;
                                font-weight:700;
                                color:#2563eb;
                                margin-bottom:20px;
                                }
                                .title {
                                font-size:22px;
                                font-weight:700;
                                margin-bottom:12px;
                                color:#111827;
                                }
                                .text {
                                color:#4b5563;
                                line-height:1.6;
                                margin-bottom:20px;
                                }
                                .btn {
                                display:inline-block;
                                background:#2563eb;
                                color:white !important;
                                padding:12px 22px;
                                border-radius:10px;
                                text-decoration:none;
                                font-weight:600;
                                }
                                .footer {
                                margin-top:28px;
                                font-size:13px;
                                color:#6b7280;
                                }
                                a { color:#2563eb; }
                            </style>
                            </head>
                            <body>
                            <div class="container">
                                <div class="logo">Learn Link</div>

                                <div class="title">Verify your email</div>

                                <p class="text">
                                Hey \u2014 welcome ${user.name} Tap the button below to confirm your email and finish setting up your account.
                                </p>

                                <p style="text-align:center; margin:28px 0;">
                                <a href="${verificationUrl}" class="btn">Verify Email</a>
                                </p>

                                <p class="text">
                                If the button doesn\u2019t work, paste this link into your browser:<br />
                                <a href="${verificationUrl}">${verificationUrl}</a>
                                </p>

                                <div class="footer">
                                If you didn\u2019t request this, you can ignore it. This link expires soon for security reasons.
                                <br /><br />
                                \u2014 Learn Link team
                                </div>
                            </div>
                            </body>
                            </html>`
          // HTML version of the message
        });
      } catch (err) {
        throw new Error(err.message);
      }
    }
  }
});

// src/middleware/GlobalErrorHandler.ts
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  let statusCode = 500;
  let errorMessage = "Internal server error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMessage = "Invalid or missing input fields.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        statusCode = 400;
        errorMessage = "Input value is too long for a field.";
        break;
      case "P2001":
      case "P2025":
        statusCode = 404;
        errorMessage = "Requested resource not found.";
        break;
      case "P2002":
        statusCode = 409;
        errorMessage = "Duplicate value. This record already exists.";
        break;
      case "P2003":
        statusCode = 400;
        errorMessage = "Invalid reference. Related record not found.";
        break;
      case "P2014":
        statusCode = 400;
        errorMessage = "Invalid relation between records.";
        break;
      default:
        statusCode = 400;
        errorMessage = "Database request error.";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMessage = "Unexpected database error occurred.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMessage = "Database engine crashed.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    switch (err.errorCode) {
      case "P1000":
        statusCode = 401;
        errorMessage = "Database authentication failed.";
        break;
      case "P1001":
        statusCode = 503;
        errorMessage = "Cannot connect to the database server.";
        break;
      case "P1002":
        statusCode = 504;
        errorMessage = "Database connection timed out.";
        break;
      case "P1017":
        statusCode = 503;
        errorMessage = "Database server closed the connection.";
        break;
      default:
        statusCode = 500;
        errorMessage = "Database initialization error.";
    }
  }
  res.status(statusCode);
  res.json({
    message: errorMessage,
    error: errorDetails
  });
}
var GlobalErrorHandler_default = errorHandler;

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    message: "Route not found.",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/tutor/tutor.route.ts
import express from "express";

// src/middleware/auth.ts
var authMiddleware = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers
      });
      if (!session) {
        return res.status(401).json({
          data: null,
          error: { message: "Unauthorized" }
        });
      }
      if (!session.user.emailVerified) {
        return res.status(401).json({
          data: null,
          error: { message: "Email Verification is required." }
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
          data: null,
          error: { message: "Forbidden access" }
        });
      }
      next();
    } catch (err) {
      next(err.message);
    }
  };
};
var auth_default = authMiddleware;

// src/modules/tutor/tutor.service.ts
var getTutorProfile = async (search) => {
  const result = await prisma.tutorProfile.findMany({
    where: {
      category: {
        subject: {
          contains: search,
          mode: "insensitive"
        }
      }
    },
    select: {
      id: true,
      bio: true,
      hourlyRate: true,
      experience: true,
      availability: true,
      category: {
        select: {
          name: true,
          subject: true,
          description: true
        }
      },
      user: {
        select: {
          name: true,
          image: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      },
      reviews: {
        select: {
          rating: true,
          comment: true
        }
      }
    }
  });
  return result;
};
var getTutorDetails = async (id) => {
  return await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      id: true,
      bio: true,
      hourlyRate: true,
      experience: true,
      availability: true,
      user: {
        select: {
          name: true,
          image: true
        }
      },
      category: {
        select: {
          name: true,
          subject: true,
          description: true
        }
      },
      reviews: {
        select: {
          rating: true,
          comment: true,
          student: {
            select: {
              image: true,
              name: true
            }
          }
        }
      }
    }
  });
};
var getOwnTutorDetails = async (id) => {
  return await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      userId: id
    },
    select: {
      id: true,
      bio: true,
      hourlyRate: true,
      experience: true,
      availability: true,
      category: {
        select: {
          id: true,
          name: true,
          subject: true,
          description: true
        }
      }
    }
  });
};
var createTutorProfile = async (userId, data) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId
    },
    select: {
      role: true
    }
  });
  if (!userData) {
    return { data: null, error: { message: "User not found" } };
  }
  if (userData.role !== "TUTOR" /* TUTOR */) {
    return { data: null, error: { message: "You are not allowed to create a tutor profile" } };
  }
  const tutorData = await prisma.tutorProfile.findUnique({
    where: {
      userId
    }
  });
  if (tutorData) {
    return { data: null, error: { message: "Tutor profile is already exist" } };
  }
  return await prisma.tutorProfile.create({
    data: {
      ...data,
      userId
    },
    select: {
      id: true,
      userId: true
    }
  });
};
var updateTutorProfile = async (userId, data) => {
  const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      id: true,
      userId: true
    }
  });
  if (tutorData.userId !== userId) {
    throw new Error("Invalid access");
  }
  return await prisma.tutorProfile.update({
    where: {
      id: tutorData.id
    },
    data,
    select: {
      id: true,
      userId: true
    }
  });
};
var deleteTutorProfile = async (userId) => {
  const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      userId
    },
    select: {
      id: true,
      userId: true
    }
  });
  if (tutorData.userId !== userId) {
    throw new Error("Invalid access");
  }
  const res = await prisma.tutorProfile.delete({
    where: {
      id: tutorData.id
    },
    select: {
      id: true,
      userId: true
    }
  });
  return res;
};
var tutorService = {
  getTutorProfile,
  createTutorProfile,
  updateTutorProfile,
  deleteTutorProfile,
  getTutorDetails,
  getOwnTutorDetails
};

// src/modules/tutor/tutor.controller.ts
var getTutorProfile2 = async (req, res, next) => {
  try {
    const { search } = req.query;
    const result = await tutorService.getTutorProfile(search);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var getTutorDetails2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tutorService.getTutorDetails(id);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var getOwnTutorDetails2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await tutorService.getOwnTutorDetails(user?.id);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var createTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await tutorService.createTutorProfile(user?.id, req.body);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var updateTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await tutorService.updateTutorProfile(user?.id, req.body);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var deleteTutorProfile2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await tutorService.deleteTutorProfile(user?.id);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var tutorController = {
  getTutorProfile: getTutorProfile2,
  getOwnTutorDetails: getOwnTutorDetails2,
  createTutorProfile: createTutorProfile2,
  updateTutorProfile: updateTutorProfile2,
  deleteTutorProfile: deleteTutorProfile2,
  getTutorDetails: getTutorDetails2
};

// src/modules/tutor/tutor.route.ts
var router = express.Router();
router.get("/", tutorController.getTutorProfile);
router.get("/me", auth_default("TUTOR" /* TUTOR */), tutorController.getOwnTutorDetails);
router.get("/:id", tutorController.getTutorDetails);
router.post("/create", auth_default("TUTOR" /* TUTOR */), tutorController.createTutorProfile);
router.patch("/update", auth_default("TUTOR" /* TUTOR */), tutorController.updateTutorProfile);
router.delete("/delete", auth_default("TUTOR" /* TUTOR */), tutorController.deleteTutorProfile);
var tutorRouter = router;

// src/modules/category/category.route.ts
import express2 from "express";

// src/modules/category/category.service.ts
var getCategory = async () => {
  const res = await prisma.category.findMany();
  return res;
};
var createCategory = async (data) => {
  const res = await prisma.category.create({
    data
  });
  return res;
};
var updateCategory = async (paramId, data) => {
  return await prisma.category.update({
    where: {
      id: paramId
    },
    data
  });
};
var deleteCategory = async (paramId) => {
  return await prisma.category.delete({
    where: {
      id: paramId
    }
  });
};
var categoryService = {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory
};

// src/modules/category/category.controller.ts
var getCategory2 = async (req, res, next) => {
  try {
    const result = await categoryService.getCategory();
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var createCategory2 = async (req, res, next) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var updateCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.updateCategory(id, req.body);
    res.status(201).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var deleteCategory2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteCategory(id);
    res.status(201).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var categoryController = {
  getCategory: getCategory2,
  createCategory: createCategory2,
  updateCategory: updateCategory2,
  deleteCategory: deleteCategory2
};

// src/modules/category/category.route.ts
var router2 = express2.Router();
router2.get("/", categoryController.getCategory);
router2.post("/create", auth_default("ADMIN" /* ADMIN */), categoryController.createCategory);
router2.patch("/update/:id", auth_default("ADMIN" /* ADMIN */), categoryController.updateCategory);
router2.delete("/delete/:id", auth_default("ADMIN" /* ADMIN */), categoryController.deleteCategory);
var categoryRouter = router2;

// src/modules/booking/booking.route.ts
import express3 from "express";

// src/modules/booking/booking.service.ts
var getBooking = async (userId, userRole) => {
  if (userRole === "ADMIN" /* ADMIN */) {
    const bookingForAdmin = await prisma.booking.findMany({
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
  } else if (userRole === "TUTOR" /* TUTOR */) {
    const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
      where: {
        userId
      },
      select: {
        id: true
      }
    });
    const bookingForTutor = await prisma.booking.findMany({
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
  } else if (userRole === "STUDENT" /* STUDENT */) {
    const bookingForStudent = await prisma.booking.findMany({
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
  } else {
    throw new Error("Unauthorized");
  }
};
var createBooking = async (userId, role, paramId, data) => {
  if (role !== "STUDENT") {
    return { data: null, error: { message: "Session can be booked by Student only." } };
  }
  const result = await prisma.booking.create({
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
var updateBooking = async (userId, paramId, data) => {
  const bookingData = await prisma.booking.findUnique({
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
  if (bookingData?.tutor.user.role !== "TUTOR" /* TUTOR */) {
  }
  if (bookingData?.tutor.user.id !== userId) {
    throw new Error("Forbidden access");
  }
  return await prisma.booking.update({
    where: {
      id: paramId
    },
    data
  });
};
var bookingService = {
  getBooking,
  createBooking,
  updateBooking
};

// src/modules/booking/booking.controller.ts
var getBooking2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await bookingService.getBooking(user?.id, user?.role);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var createBooking2 = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await bookingService.createBooking(user?.id, user?.role, id, req.body);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var updateBooking2 = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await bookingService.updateBooking(user?.id, id, req.body);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var bookingController = {
  getBooking: getBooking2,
  createBooking: createBooking2,
  updateBooking: updateBooking2
};

// src/modules/booking/booking.route.ts
var router3 = express3.Router();
router3.get("/", auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), bookingController.getBooking);
router3.post("/:id", auth_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), bookingController.createBooking);
router3.patch("/:id", auth_default("TUTOR" /* TUTOR */), bookingController.updateBooking);
var bookingRouter = router3;

// src/modules/review/review.route.ts
import express4 from "express";

// src/modules/review/review.service.ts
var getReview = async (paramId) => {
  return await prisma.review.findMany({
    where: {
      tutorId: paramId
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      student: {
        select: {
          name: true
        }
      }
    }
  });
};
var getOwnReview = async (id) => {
  const tutorData = await prisma.tutorProfile.findUniqueOrThrow({
    where: {
      userId: id
    },
    select: {
      id: true
    }
  });
  return await prisma.review.findMany({
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
              subject: true
            }
          }
        }
      }
    }
  });
};
var createReview = async (userId, paramId, data) => {
  const bookingData = await prisma.booking.findFirst({
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
  if (!bookingData) {
    return;
  }
  const result = await prisma.review.create({
    data: {
      ...data,
      studentId: userId,
      tutorId: bookingData?.tutor.id
    }
  });
  if (result) {
    await prisma.booking.update({
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
var reviewService = {
  getReview,
  createReview,
  getOwnReview
};

// src/modules/review/review.controller.ts
var getReview2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await reviewService.getReview(id);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var getOwnReview2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await reviewService.getOwnReview(user?.id);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var createReview2 = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const result = await reviewService.createReview(user?.id, id, req.body);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var reviewController = {
  getReview: getReview2,
  createReview: createReview2,
  getOwnReview: getOwnReview2
};

// src/modules/review/review.route.ts
var router4 = express4.Router();
router4.get("/me", auth_default("TUTOR" /* TUTOR */), reviewController.getOwnReview);
router4.get("/:id", reviewController.getReview);
router4.post("/create/:id", auth_default("STUDENT" /* STUDENT */), reviewController.createReview);
var reviewRouter = router4;

// src/modules/user/user.route.ts
import express5 from "express";

// src/modules/user/user.service.ts
var getUser = async () => {
  return await prisma.user.findMany();
};
var getMyUser = async (id) => {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id
    }
  });
};
var updateUser = async (paramId, data) => {
  return await prisma.user.update({
    where: {
      id: paramId
    },
    data
  });
};
var updateOwnUser = async (userId, data) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data
  });
};
var userService = {
  getUser,
  updateUser,
  getMyUser,
  updateOwnUser
};

// src/modules/user/user.controller.ts
var getUser2 = async (req, res, next) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var getMyUser2 = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await userService.getMyUser(user?.id);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var updateUser2 = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await userService.updateUser(id, data);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var updateOwnUser2 = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;
    const result = await userService.updateOwnUser(user?.id, data);
    res.status(200).json({
      result
    });
  } catch (err) {
    next(err);
  }
};
var userController = {
  getUser: getUser2,
  updateUser: updateUser2,
  getMyUser: getMyUser2,
  updateOwnUser: updateOwnUser2
};

// src/modules/user/user.route.ts
var router5 = express5.Router();
router5.get("/me", auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), userController.getMyUser);
router5.patch("/me", auth_default("ADMIN" /* ADMIN */, "STUDENT" /* STUDENT */, "TUTOR" /* TUTOR */), userController.updateOwnUser);
router5.get("/", auth_default("ADMIN" /* ADMIN */), userController.getUser);
router5.patch("/:id", auth_default("ADMIN" /* ADMIN */), userController.updateUser);
var userRouter = router5;

// src/app.ts
var app = express6();
app.use(express6.json());
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:3000",
  credentials: true
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.send(`Express server is running`);
});
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/auth/", userRouter);
app.use(GlobalErrorHandler_default);
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
