import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import BaseController from '@infrastructure/controllers/controller';
import TravelRouteRepository from '@infrastructure/repository/csv/travel-route.repository';

@Controller('travel-route')
export class TravelRouteController extends BaseController {
  @Get('best-route/:departure/:destination')
  public async bestRoute(req: Request, res: Response): Promise<void> {
    try {
      const repo = new TravelRouteRepository();
      const bestRoute = await repo.getBestRoute(
        req.params.departure,
        req.params.destination,
      );

      res.status(200).send({
        route: {
          departure: bestRoute.getDeparture(),
          destination: bestRoute.getDestination(),
          complete: bestRoute.getRouteComplete(),
          price: bestRoute.getPrice(),
        },
      });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  @Post('')
  public async store(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).send({ status: 'ok' });
  }
}

export default TravelRouteController;
