import AddTravelRoute from '@application/usecases/add-travel-route.usecase';
import TravelRouteRepository from '@infrastructure/repository/filetext/travel-route.repository';
import TravelRouteEntity from '@domain/travel-route.entity';

jest.mock('@domain/travel-route.entity');
jest.mock('@infrastructure/repository/filetext/travel-route.repository');

describe('AddTravelRoute', () => {
  it('create travel-route-entity successfully.', () => {
    const repositoryMocked = new TravelRouteRepository() as jest.Mocked<TravelRouteRepository>;
    const useCase = new AddTravelRoute(repositoryMocked);
    const entity = useCase.createEntity(['XPT', 'ABC'], 1);

    expect(entity).toBeInstanceOf(TravelRouteEntity);
  });

  it('added travel-route successfully.', async () => {
    const repositoryMocked = new TravelRouteRepository() as jest.Mocked<TravelRouteRepository>;
    const useCase = new AddTravelRoute(repositoryMocked);
    const entity = useCase.createEntity(['XPT', 'ABC'], 1);

    jest
      .spyOn(repositoryMocked, 'persistRoute')
      .mockImplementation(async () => entity);

    const entityAdded = await useCase.add(entity);

    expect(entityAdded).toBeInstanceOf(TravelRouteEntity);
  });
});
