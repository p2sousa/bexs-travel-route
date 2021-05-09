import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '@infrastructure/controllers/controller';

@Controller('')
export class HealthCheckController extends BaseController {
  @Get('health')
  public async health(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).send({ status: 'ok' });
  }
}

export default HealthCheckController;
