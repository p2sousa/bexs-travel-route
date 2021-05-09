/* eslint-disable no-restricted-syntax */
import { ITravelRouteEntity } from '@domain/interfaces/travel-route.interface';

export class TravelRouteEntity implements ITravelRouteEntity {
  private id: string | null;

  private departure: string;

  private destination: string;

  private routeComplete: string[];

  private price: number;

  constructor(
    id: string | null,
    departure: string,
    destination: string,
    routeComplete: string[],
    price: number,
  ) {
    if (
      !this.isRouteValid(departure) ||
      !this.isRouteValid(destination) ||
      !this.isRouteCompleteValid(routeComplete)
    ) {
      throw new Error('Invalid Paramenter');
    }

    this.id = id;
    this.departure = departure;
    this.destination = destination;
    this.routeComplete = routeComplete;
    this.price = price;
  }

  private isRouteValid(route: string): boolean {
    if (route.length > 3 || route.length < 3) {
      return false;
    }
    return true;
  }

  private isRouteCompleteValid(routeComplete: string[]): boolean {
    if (routeComplete.length < 2) {
      return false;
    }

    for (const route of routeComplete) {
      if (!this.isRouteValid(route)) {
        return false;
      }
    }

    return true;
  }

  public getId(): string | null {
    return this.id;
  }

  public getDeparture(): string {
    return this.departure;
  }

  public getDestination(): string {
    return this.destination;
  }

  public getRouteComplete(): string[] {
    return this.routeComplete;
  }

  public getPrice(): number {
    return this.price;
  }
}

export default TravelRouteEntity;
