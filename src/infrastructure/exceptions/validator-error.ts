import { ValidationError } from 'express-validator';

/* eslint-disable max-classes-per-file */
export class ValidatorError extends Error {
  private readonly errors: { errors: ValidationError[] };

  constructor(message: string, errors: { errors: ValidationError[] }) {
    super();
    this.errors = errors;
    this.message = message;
  }

  getCode(): number {
    return 400;
  }

  getErrors(): { errors: ValidationError[] } {
    return this.errors;
  }
}

export default ValidatorError;
