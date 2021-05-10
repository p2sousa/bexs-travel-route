import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import BaseController from '@infrastructure/controllers/controller';
import TravelRouteRepository from '@infrastructure/repository/filetext/travel-route.repository';
import AddTravelRoute from '@application/usecases/add-travel-route.usecase';
import { body, param, validationResult } from 'express-validator';
import ValidatorError from '@infrastructure/exceptions/validator-error';

@Controller('travel-route')
export class TravelRouteController extends BaseController {
  @Get('best-route/:departure/:destination')
  @Middleware(param('departure').isString().isLength({ min: 3, max: 3 }))
  @Middleware(param('destination').isString().isLength({ min: 3, max: 3 }))
  public async bestRoute(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ValidatorError('Validator request error', {
          errors: errors.array(),
        });
      }
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
      switch (error.constructor) {
        case ValidatorError:
          res.status(error.getCode()).send(error.getErrors());
          break;

        default:
          res.status(400).send({ error: error.message });
      }
    }
  }

  @Post('')
  @Middleware(body('route').isArray({ min: 2 }))
  @Middleware(body('price').isNumeric())
  public async store(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new ValidatorError('Validator request error', {
          errors: errors.array(),
        });
      }

      const addTravelRouteUseCase = new AddTravelRoute(
        new TravelRouteRepository(),
      );

      const entity = addTravelRouteUseCase.createEntity(
        req.body.route,
        parseFloat(req.body.price),
      );

      const travelRouteCreated = await addTravelRouteUseCase.add(entity);

      res.status(201).send({
        route: {
          departure: travelRouteCreated.getDeparture(),
          destination: travelRouteCreated.getDestination(),
          complete: travelRouteCreated.getRouteComplete(),
          price: travelRouteCreated.getPrice(),
        },
      });
    } catch (error) {
      switch (error.constructor) {
        case ValidatorError:
          res.status(error.getCode()).send(error.getErrors());
          break;

        default:
          res.status(400).send({ error: error.message });
      }
    }
  }
}

export default TravelRouteController;
