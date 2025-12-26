import { type Request, type Response } from "express";
export declare function addProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function delProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function lowquantityalert(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=ProductController.d.ts.map