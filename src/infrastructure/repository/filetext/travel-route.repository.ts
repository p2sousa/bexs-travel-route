import {
  ITravelRouteEntity,
  ITravelRouteRepository,
} from '@domain/interfaces/travel-route.interface';
import TravelRouteEntity from '@domain/travel-route.entity';
import logger from '@configurations/logger';
import * as fs from 'fs';
import settings from '@configurations/settings';

export default class TravelRouteRepository implements ITravelRouteRepository {
  public async getBestRoute(
    departure: string,
    destination: string,
  ): Promise<ITravelRouteEntity> {
    try {
      const data = fs.readFileSync(settings.database.filetext.path, 'utf-8');

      const lines = data.split(/\r?\n/);
      const initRegex = new RegExp(`^${departure},`, 'g');
      const endRegex = new RegExp(`.${destination},[0-9]`, 'g');

      const routesValid = lines.filter(
        (value) => initRegex.test(value) && endRegex.test(value),
      );

      if (routesValid.length < 1) {
        throw new Error('Not found route valid.');
      }

      const bestRoute: string = routesValid.reduce(
        (bestRouteMoment: string, currentRoute: string) => {
          const currentPrice = parseFloat(currentRoute.split(',').slice(-1)[0]);
          const bestPrice = parseFloat(bestRouteMoment.split(',').slice(-1)[0]);
          if (currentPrice < bestPrice) {
            return currentRoute;
          }

          return bestRouteMoment;
        },
      );

      const bestRouteArray = bestRoute.split(',');
      const price = bestRouteArray.pop() as string;

      return new TravelRouteEntity(
        null,
        departure,
        destination,
        bestRouteArray,
        parseFloat(price),
      );
    } catch (err) {
      logger.error('Error: TravelRouteRepository::getBestRoute', {
        error: err.message,
      });
      throw err;
    }
  }

  public async persistRoute(
    route: ITravelRouteEntity,
  ): Promise<ITravelRouteEntity> {
    try {
      const dataToSave = `\n${route.getRouteComplete()},${route.getPrice()}`;

      fs.appendFileSync(settings.database.filetext.path, dataToSave);

      return route;
    } catch (err) {
      logger.error('Error: TravelRouteRepository::persistRoute', {
        error: err.message,
      });
      throw err;
    }
  }
}
