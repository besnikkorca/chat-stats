// decided to use the command pattern (https://en.wikipedia.org/wiki/Command_pattern)
// since it's more efficent than the Memento pattern (https://en.wikipedia.org/wiki/Memento_pattern)
import { GenericVoidFunc } from 'types/global';

type Command = {
  action: { type: string; cb: GenericVoidFunc; text: string };
  inverse: { type: string; cb: GenericVoidFunc; text: string };
};

export default class CommandPattern {
  static undoCommands: Command[] = [];
  static redoCommands: Command[] = [];

  static saveCommand(command: Command) {
    CommandPattern.undoCommands.push(command);
  }

  static undo() {
    const lastCommand = CommandPattern.undoCommands.pop();

    if (!lastCommand) return;
    lastCommand.inverse.cb();
    CommandPattern.redoCommands.push(lastCommand);
  }

  static redo() {
    const lastCommand = CommandPattern.redoCommands.pop();
    if (!lastCommand) return;
    lastCommand.action.cb();
    CommandPattern.undoCommands.push(lastCommand);
  }

  static undoSize() {
    return CommandPattern.undoCommands.length;
  }

  static redoSize() {
    return CommandPattern.redoCommands.length;
  }
}
