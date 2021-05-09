import { OpenAPIV3 } from 'openapi-types';

export const travelRoutePaths: OpenAPIV3.PathsObject = {
  '/travel-route/best-route/{departure}/{destination}': {
    get: {
      tags: ['TravelRoute'],
      summary: 'Retorna a melhor rota entre dois pontos.',
      operationId: 'getBestTravelRoute',
      parameters: [
        {
          name: 'departure',
          in: 'path',
          description: 'Ponto de partida da rota',
          required: true,
          schema: {
            type: 'string',
            minLength: 3,
            maxLength: 3,
          },
        },
        {
          name: 'destination',
          in: 'path',
          description: 'Ponto de destino da rota',
          required: true,
          schema: {
            type: 'string',
            minLength: 3,
            maxLength: 3,
          },
        },
      ],
      responses: {
        200: {
          description: 'Encontrada a melhor rota entre dois pontos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/bestTravelRoute',
              },
            },
          },
        },
        400: {
          description: 'Request Syntax incorreta',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/error',
              },
            },
          },
        },
      },
    },
  },
  '/travel-route': {
    post: {
      tags: ['TravelRoute'],
      summary: 'Cadastra uma nova rota',
      operationId: 'storeTravelRoute',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['route', 'price'],
              properties: {
                route: {
                  type: 'array',
                  items: {
                    type: 'string',
                    minItems: 2,
                    minLength: 3,
                    maxLength: 3,
                  },
                  description: 'Objecto contendo a rota',
                  example: ['GRU', 'ORL', 'CGD'],
                },
                price: {
                  type: 'number',
                  description: 'Preço da rota',
                  example: 30,
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Rota cadastrada com sucesso.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/bestTravelRoute',
              },
            },
          },
        },
        400: {
          description: 'Request Syntax incorreta',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/error',
              },
            },
          },
        },
      },
    },
  },
};

export const bestTravelRouteSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    route: {
      type: 'object',
      properties: {
        departure: {
          type: 'string',
          description: 'Ponto de partida da rota',
          example: 'GRU',
        },
        destination: {
          type: 'string',
          description: 'Ponto de destino da rota',
          example: 'CDG',
        },
        complete: {
          type: 'string',
          description: 'Rota completa com a partida, destino e conexões.',
          example: 'GRU - BRC - SCL - ORL - CDG',
        },
        price: {
          type: 'number',
          description: 'Preço da rota.',
          example: 40.5,
        },
      },
    },
  },
};
