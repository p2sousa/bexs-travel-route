import commander, { Command } from 'commander';

abstract class BaseCommander {
  protected program: commander.Command;

  constructor() {
    this.program = new Command();
  }
}

export default BaseCommander;
