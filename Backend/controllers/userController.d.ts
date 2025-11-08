import express from "express";
import type { Request, Response } from "express";
export declare const SignUp: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const VerifyOTP: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const SignIn: (req: Request, res: Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const ForgotPassword: (req: Request, res: Response) => Promise<void>;
export declare const VerifyForgotPassword: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=userController.d.ts.map