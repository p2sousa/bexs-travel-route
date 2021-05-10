import {
  ITravelRouteEntity,
  ITravelRouteRepository,
} from '@domain/interfaces/travel-route.interface';
import logger from '@configurations/logger';
import TravelRouteEntity from '@domain/travel-route.entity';

class AddTravelRoute {
  private repository: ITravelRouteRepository;

  constructor(repository: ITravelRouteRepository) {
    this.repository = repository;
  }

  public createEntity(route: string[], price: number): ITravelRouteEntity {
    try {
      const routeComplete = [...route];
      const departure = route.shift() as string;
      const destination = route.pop() as string;

      return new TravelRouteEntity(
        null,
        departure,
        destination,
        routeComplete,
        price,
      );
    } catch (err) {
      logger.error('AddTravelRoute::createEntity Error', {
        error: err.message,
      });
      throw err;
    }
  }

  public async add(entity: ITravelRouteEntity): Promise<ITravelRouteEntity> {
    try {
      return await this.repository.persistRoute(entity);
    } catch (err) {
      logger.error('AddTravelRoute::add Error', {
        error: err.message,
      });
      throw err;
    }
  }
}

export default AddTravelRoute;
