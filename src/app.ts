import './configurations/module-alias';
import { Server } from '@overnightjs/core';
import { Application, urlencoded, json } from 'express';
import * as http from 'http';
import swaggerUi from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import logger from '@configurations/logger';
import { apiErrorValidator } from '@infrastructure/middlewares/api-error-validator.middlewares';
import HealthCheckController from '@infrastructure/controllers/health-check.controller';
import openapiDocument from '@infrastructure/contracts';

export default class SetupServer extends Server {
  private server?: http.Server;

  private port: number;

  constructor(port: number) {
    super();
    this.port = port;
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.docsSetup();
    this.setupControllers();
    this.setupErrorHandlers();
  }

  private setupExpress(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
    OpenApiValidator.middleware({
      apiSpec: openapiDocument as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    });
  }

  private setupControllers(): void {
    this.addControllers([new HealthCheckController()]);
  }

  private setupErrorHandlers(): void {
    this.app.use(apiErrorValidator);
  }

  public getApp(): Application {
    return this.app;
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}
