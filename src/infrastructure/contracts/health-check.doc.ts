import { OpenAPIV3 } from 'openapi-types';

export const healthCheckPaths: OpenAPIV3.PathsObject = {
  '/health': {
    get: {
      tags: ['HealthCheck'],
      summary: 'Retorna status da aplicação',
      operationId: 'getStatusApplication',
      parameters: [],
      responses: {
        200: {
          description: 'Aplicação está ok',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/healthcheck',
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

export const healthcheckSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    status: {
      type: 'string',
      description: 'Status da aplicação',
      example: 'ok',
    },
  },
};
