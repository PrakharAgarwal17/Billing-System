import type { Request, Response } from "express";
export declare function createShop(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateShop(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function delShop(req: Request, res: Response): Promise<void>;
export declare function renderShop(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=shopcontroller.d.ts.map