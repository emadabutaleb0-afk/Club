import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const data = schema.parse(req[source]);
            req[source] = data;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return _res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: error.errors.map((e) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                });
            }
            next(error);
        }
    };
}
