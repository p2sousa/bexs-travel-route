import TravelRouteEntity from '@domain/travel-route.entity';

describe('TravelRouteEntity', () => {
  it('create travel-route-entity successfully.', () => {
    expect(
      new TravelRouteEntity(null, 'GRU', 'BRA', ['GRU', 'GUA', 'BRA'], 10),
    ).toMatchObject({
      id: null,
      departure: 'GRU',
      destination: 'BRA',
      routeComplete: ['GRU', 'GUA', 'BRA'],
      price: 10,
    });

    expect(
      new TravelRouteEntity(
        '123e4567-e89b-12d3-a456-426655440000',
        'GRU',
        'BRA',
        ['GRU', 'GUA', 'BRA'],
        10,
      ),
    ).toMatchObject({
      id: '123e4567-e89b-12d3-a456-426655440000',
      departure: 'GRU',
      destination: 'BRA',
      routeComplete: ['GRU', 'GUA', 'BRA'],
      price: 10,
    });

    const entity = new TravelRouteEntity(
      null,
      'GRU',
      'BRA',
      ['GRU', 'GUA', 'BRA'],
      10,
    );

    expect(entity.getId()).toBeNull();
    expect(entity.getDeparture()).toEqual('GRU');
    expect(entity.getDestination()).toEqual('BRA');
    expect(entity.getRouteComplete()).toEqual(['GRU', 'GUA', 'BRA']);
    expect(entity.getPrice()).toEqual(10);
  });

  it('create failed travel route entity.', () => {
    try {
      // eslint-disable-next-line no-new
      new TravelRouteEntity(null, 'GTTTTT', 'BRA', ['GRU', 'GUA', 'BRA'], 10);
    } catch (error) {
      expect(error.message).toEqual('Invalid Paramenter');
    }

    try {
      // eslint-disable-next-line no-new
      new TravelRouteEntity(null, 'GRU', 'BRAAAAA', ['GRU', 'GUA', 'BRA'], 10);
    } catch (error) {
      expect(error.message).toEqual('Invalid Paramenter');
    }

    try {
      // eslint-disable-next-line no-new
      new TravelRouteEntity(null, 'GRU', 'BRA', ['GRU'], 10);
    } catch (error) {
      expect(error.message).toEqual('Invalid Paramenter');
    }
  });
});
