import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError, { APIError } from '@configurations/api-error';

export abstract class BaseController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected sendCreateUpdateErrorResponse(res: Response, error: Error): void {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(
      ApiError.format({
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong!',
      }),
    );
  }

  protected sendErrorResponse(res: Response, apiError: APIError): Response {
    return res.status(apiError.code).send(ApiError.format(apiError));
  }
}

export default BaseController;
