import process from "process";
import fs from "fs/promises";
import path from "path";

import { DirItems } from "../dir-items/index.js";
import { throwError } from "../utils/index.js";

const FAILED_OPERATION_MESSAGE = "Operation failed";

const sortCallback = (a, b) => a.name - b.name;

export const onLsPressed = async () => {
  const files = [];
  const folders = [];

  try {
    const dirItems = await fs.readdir(process.cwd(), { withFileTypes: true });

    for (const dirItem of dirItems) {
      const type = dirItem.isFile() ? "file" : "directory";
      const item = new DirItems(dirItem.name, type);

      if (type === "file") {
        files.push(item);
      } else {
        folders.push(item);
      }
    }

    folders.sort(sortCallback);
    files.sort(sortCallback);

    console.table(folders.concat(files));
  } catch {
    throwError();
  }
};

const getCurrentDir = () => {
  const currentDir = process.cwd();

  return currentDir;
};

export const onUpPressed = async () => {
  const currentDir = process.cwd();
  const parentDir = path.join(currentDir, "..");

  process.chdir(parentDir);
};

export const onCdPressed = async (pathToDirectory = "") => {
  const resolvedPath = path.resolve(pathToDirectory);

  try {
    process.chdir(resolvedPath);
  } catch {
    console.log(FAILED_OPERATION_MESSAGE);
  }
};
