import settings from '@root/src/configurations/settings';
import TravelRouteEntity from '@root/src/domain/travel-route.entity';
import * as fs from 'fs';
import path from 'path';
import TravelRouteRepository from '../travel-route.repository';

beforeAll(async () => {
  const root = path.resolve();

  fs.copyFileSync(
    path.join(root, 'jest', '__tmp__', 'input-file.example.txt'),
    path.join(root, 'jest', '__tmp__', 'input-file.txt'),
  );

  settings.database.filetext.path = path.join(
    root,
    'jest',
    '__tmp__',
    'input-file.txt',
  );
});

afterAll(async () => {
  const root = path.resolve();
  fs.rmSync(path.join(root, 'jest', '__tmp__', 'input-file.txt'));
});

describe('TravelRouteRepository', () => {
  it('get best route successfully.', async () => {
    const repository = new TravelRouteRepository();
    const bestRoute = await repository.getBestRoute('GRU', 'ORL');
    expect(bestRoute).toBeInstanceOf(TravelRouteEntity);
    expect(bestRoute.getId()).toBeNull();
    expect(bestRoute.getDeparture()).toEqual('GRU');
    expect(bestRoute.getDestination()).toEqual('ORL');
    expect(bestRoute.getRouteComplete()).toEqual(['GRU', 'BRC', 'SCL', 'ORL']);
    expect(bestRoute.getPrice()).toEqual(15);
  });

  it('throw not found get best route.', async () => {
    try {
      const repository = new TravelRouteRepository();
      await repository.getBestRoute('GRU', 'ORD');
    } catch (error) {
      expect(error.message).toEqual('Not found route valid.');
    }
  });

  it('persist new route successfully.', async () => {
    const repository = new TravelRouteRepository();

    const entity = new TravelRouteEntity(
      null,
      'BRB',
      'SAP',
      ['BRB', 'UAU', 'SAP'],
      10,
    );

    const routeCreated = await repository.persistRoute(entity);
    expect(routeCreated).toBeInstanceOf(TravelRouteEntity);
    expect(routeCreated.getId()).toBeNull();
    expect(routeCreated.getDeparture()).toEqual('BRB');
    expect(routeCreated.getDestination()).toEqual('SAP');
    expect(routeCreated.getRouteComplete()).toEqual(['BRB', 'UAU', 'SAP']);
    expect(routeCreated.getPrice()).toEqual(10);

    const bestRoute = await repository.getBestRoute('BRB', 'SAP');

    expect(bestRoute).toBeInstanceOf(TravelRouteEntity);
    expect(bestRoute.getId()).toBeNull();
    expect(bestRoute.getDeparture()).toEqual('BRB');
    expect(bestRoute.getDestination()).toEqual('SAP');
    expect(bestRoute.getRouteComplete()).toEqual(['BRB', 'UAU', 'SAP']);
    expect(bestRoute.getPrice()).toEqual(10);
  });
});
