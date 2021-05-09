export interface ITravelRouteEntity {
  getId(): string | null;
  getDeparture(): string;
  getDestination(): string;
  getRouteComplete(): [];
  getPrice(): number;
}

export interface ITravelRouteRepository {
  getBestRoute(departure: string, destination: string): ITravelRouteEntity;
  persistRoute(route: ITravelRouteEntity): ITravelRouteEntity;
}
