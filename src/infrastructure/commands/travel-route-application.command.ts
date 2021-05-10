import '../../configurations/module-alias';
import commander from 'commander';
import BaseCommander from '@infrastructure/commands/command';
import { ITravelRouteRepository } from '@domain/interfaces/travel-route.interface';
import { version, description } from '@root/package.json';
import logger from '@configurations/logger';
import TravelRouteRepository from '@infrastructure/repository/filetext/travel-route.repository';
import inquirer from 'inquirer';
import settings from '@configurations/settings';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

class TravelRouteApplicationCommand extends BaseCommander {
  private options: commander.OptionValues;

  private repository: ITravelRouteRepository;

  constructor(repository: ITravelRouteRepository) {
    super();

    this.program
      .version(version)
      .description(description)
      .option('-f, --file <path>', 'arquivo com as rotas');

    this.program.parse(process.argv);

    this.options = this.program.opts();

    if (Object.keys(this.options).length === 0) {
      this.program.help();
    }

    settings.database.filetext.path = this.options.file;

    this.repository = repository;
  }

  public async main() {
    this.program.command('best-route [route]').action(async (route) => {
      let answers;
      if (!route) {
        const regex = new RegExp('^[A-Z]{3}-[A-Z]{3}$');
        answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'route',
            message: 'Por favor informe a rota desejada:',
            validate: (value: any) =>
              value && regex.test(value)
                ? true
                : 'Não é permitido uma rota vazia ou fora do padrão. ex:(GRU-BRC)',
          },
        ]);

        const travelRoute = answers.route.split('-');
        try {
          const bestRoute = await this.repository.getBestRoute(
            travelRoute[0],
            travelRoute[1],
          );
          console.log(
            `A melhore rota encontrada: ${bestRoute
              .getRouteComplete()
              .join('-')} > ${bestRoute.getPrice()}`,
          );
        } catch (error) {
          console.log(
            `Não foi encontrado rotas com essa configuração: ${answers.route}`,
          );
        }
      }
    });

    this.program.parse(process.argv);

    this.options = this.program.opts();

    if (Object.keys(this.options).length === 0) {
      this.program.help();
    }
  }
}

(async (): Promise<void> => {
  try {
    const command = new TravelRouteApplicationCommand(
      new TravelRouteRepository(),
    );
    command.main();

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    // eslint-disable-next-line no-restricted-syntax
    for (const exitSignal of exitSignals) {
      process.on(exitSignal, async () => {
        try {
          logger.info(`Command exited with success`);
          process.exit(ExitStatus.Success);
        } catch (error) {
          logger.error(`Command exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      });
    }
  } catch (error) {
    logger.error(`Command exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
