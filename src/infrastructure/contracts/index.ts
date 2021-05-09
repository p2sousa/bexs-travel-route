import { OpenAPIV3 } from 'openapi-types';
import { errorSchema } from '@infrastructure/contracts/errors.doc';
import {
  healthcheckSchema,
  healthCheckPaths,
} from '@infrastructure/contracts/health-check.doc';

import {
  travelRoutePaths,
  bestTravelRouteSchema,
} from '@infrastructure/contracts/travel-route.doc';

const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.1',
  info: {
    description: 'Documentação da api do serviço de rota de viagem bexs.',
    version: 'v1',
    title: 'Bexs Travel Route Service',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
    },
  ],
  paths: {
    ...healthCheckPaths,
    ...travelRoutePaths,
  },
  components: {
    schemas: {
      healthcheck: healthcheckSchema,
      bestTravelRoute: bestTravelRouteSchema,
      error: errorSchema,
    },
  },
};

export default swaggerDocument;
