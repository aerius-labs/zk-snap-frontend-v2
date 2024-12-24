import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public validationErrors?: z.ZodError
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
