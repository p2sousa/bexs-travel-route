export interface ITravelRouteEntity {
  getId(): string | null;
  getDeparture(): string;
  getDestination(): string;
  getRouteComplete(): string[];
  getPrice(): number;
}

export interface ITravelRouteRepository {
  getBestRoute(
    departure: string,
    destination: string,
  ): Promise<ITravelRouteEntity>;
  persistRoute(route: ITravelRouteEntity): Promise<ITravelRouteEntity>;
}
