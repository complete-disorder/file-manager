import readline from "readline";
import process from "process";

import { showInvalidMessage } from "../utils/index.js";

import {
  onCatPressed,
  onAddPressed,
  onRmPressed,
  onRnPressed,
  onCpPressed,
  onMvPressed,
  osCommandHandler,
  onUpPressed,
  onLsPressed,
  onCdPressed,
  compress,
  decompress,
  calculateHash,
} from "../modules/index.js";

const { stdin: input, stdout: output } = process;

const commands = Object.freeze({
  up: onUpPressed,
  ls: onLsPressed,
  cd: onCdPressed,
  cat: onCatPressed,
  add: onAddPressed,
  rm: onRmPressed,
  rn: onRnPressed,
  cp: onCpPressed,
  mv: onMvPressed,
  compress: compress,
  decompress: decompress,
  os: osCommandHandler,
  hash: calculateHash,
});

export class Readline {
  rl = readline.createInterface({ input, output });

  constructor(showFarewell, showWorkingDirectory) {
    this.showFarewell = showFarewell;

    this.rl.on("line", (line = "") =>
      this.commandsHandler(line, showWorkingDirectory)
    );
    this.rl.on("SIGINT", () => this.close(showFarewell));
  }

  commandsHandler(line = "", fn) {
    const args = line.trim().split(" ");

    const [command, secondArg, thirdArg] = args;

    if (command === ".exit") {
      this.close();
      return;
    }

    const trimmedValue = command.trim();

    if (commands[trimmedValue]) {
      commands[trimmedValue](secondArg, thirdArg).then(fn);
    } else {
      showInvalidMessage();
      fn();
    }
  }

  close() {
    this.rl.close();
    this.showFarewell();
  }
}
