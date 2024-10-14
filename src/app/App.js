import process from "process";
import os from "os";

import { Readline } from "../readline/index.js";

const GREETING_MESSAGE = "Welcome to the File Manager";
const WORKING_DIRECTORY_MESSAGE = "You are currently in";
const GOODBYE = "goodbye!";
const THANX_MESSAGE = "Thank you for using File Manager";

export class App {
  username = "Anonymous";
  usernameRegExp = /^--username=('[^']'|"[^"]"|\S+)$/;

  constructor() {
    const homedir = os.homedir();
    process.chdir(homedir);

    this.setUserName();
    this.showGreeting();
    this.showWorkingDirectory();
    this.readline = new Readline(
      () => this.showFarewell(),
      () => this.showWorkingDirectory()
    );
  }

  setUserName() {
    const passedArgument = process.argv[2];

    if (!passedArgument) {
      return;
    }

    const matched = passedArgument.match(this.usernameRegExp);

    if (!matched) {
      return;
    }

    const [_, username] = matched;

    this.username = username;
  }

  showGreeting() {
    console.log(`${GREETING_MESSAGE}, ${this.username}!${os.EOL}`);
  }

  showWorkingDirectory() {
    console.log(`${WORKING_DIRECTORY_MESSAGE} ${process.cwd()}`);
  }

  showFarewell() {
    const FAREWELL_MESSAGE = `${THANX_MESSAGE}, ${this.username}, ${GOODBYE}`;
    console.log(`${FAREWELL_MESSAGE}${os.EOL}`);
  }
}
