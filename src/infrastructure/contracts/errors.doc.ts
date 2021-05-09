import { OpenAPIV3 } from 'openapi-types';

export const errorSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    statusCode: {
      type: 'integer',
      description: 'HTTP status code',
      example: 500,
    },
    error: {
      type: 'string',
      description: 'Tipo do erro HTTP',
    },
    message: {
      oneOf: [
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        {
          type: 'string',
        },
      ],
      description: 'Mensagem indicando a falha ocorrida.',
    },
  },
};

export default {
  errorSchema,
};
