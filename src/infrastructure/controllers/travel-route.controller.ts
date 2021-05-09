import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '@infrastructure/controllers/controller';

@Controller('travel-route')
export class TravelRouteController extends BaseController {
  @Get('best-route/:departure/:destination')
  public async bestRoute(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).send({ status: 'ok' });
  }

  @Post('')
  public async store(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).send({ status: 'ok' });
  }
}

export default TravelRouteController;
