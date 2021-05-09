/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ApiError from '@configurations/api-error';
import { StatusCodes } from 'http-status-codes';

export interface HTTPError extends Error {
  status?: number;
}

export function apiErrorValidator(
  error: HTTPError,
  _: Partial<Request>,
  res: Response,
  __: NextFunction,
): void {
  const errorCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  res
    .status(errorCode)
    .json(ApiError.format({ code: errorCode, message: error.message }));
}
