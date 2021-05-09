import { OpenAPIV3 } from 'openapi-types';
import { errorSchema } from '@infrastructure/contracts/errors.doc';
import {
  healthcheckSchema,
  healthCheckPaths,
} from '@infrastructure/contracts/health-check.doc';

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
  },
  components: {
    schemas: {
      healthcheck: healthcheckSchema,
      error: errorSchema,
    },
  },
};

export default swaggerDocument;
