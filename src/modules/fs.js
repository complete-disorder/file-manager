import path from "path";
import fs from "fs/promises";
import process from "process";
import { createReadStream, createWriteStream } from "fs";

const FAILED_OPERATION_MESSAGE = "Operation failed";

const showFailedOperationError = () => console.log(FAILED_OPERATION_MESSAGE);

export const onCatPressed = async (pathToFile = "") => {
  const currentPath = path.resolve(pathToFile);

  const readStream = createReadStream(currentPath);
  readStream.pipe(process.stdout);

  readStream.on("error", showFailedOperationError);
};

export const onAddPressed = async (filename = "") => {
  try {
    const currentPath = path.resolve(filename);
    await fs.writeFile(currentPath, "", { flag: "wx" });
  } catch {
    console.log(FAILED_OPERATION_MESSAGE);
  }
};

export const onRmPressed = async (path_to_file = "") => {
  try {
    const PATH = path.resolve(path_to_file);
    await fs.rm(PATH);
  } catch {
    console.log(FAILED_OPERATION_MESSAGE);
  }
};

export const onRnPressed = async (pathToFile = "", filename = "") => {
  try {
    const resolvedPath = path.resolve(pathToFile);
    const newFilePath = path.resolve(filename);
    await fs.rename(resolvedPath, newFilePath);
  } catch {
    console.log(FAILED_OPERATION_MESSAGE);
  }
};

export const onCpPressed = async (
  path_to_file = "",
  path_to_new_directory = ""
) => {
  const { base } = path.parse(path_to_file);
  const PATH = path.resolve(path_to_file);

  const writeStreamPath = path.resolve(path_to_new_directory, base);

  const readStream = createReadStream(PATH);
  const writeStream = createWriteStream(writeStreamPath);

  readStream.pipe(writeStream);

  let errorHandled = false;

  const handleError = () => {
    if (!errorHandled) {
      console.log(FAILED_OPERATION_MESSAGE);
      errorHandled = true;
    }
  };

  readStream.on("error", handleError);
  writeStream.on("error", handleError);
};

export const onMvPressed = async (
  path_to_file = "",
  path_to_new_directory = ""
) => {
  onCpPressed(path_to_file, path_to_new_directory);

  try {
    const resolvedPath = path.resolve(path_to_file);
    await fs.rm(resolvedPath);
  } catch {
    console.log(FAILED_OPERATION_MESSAGE);
  }
};
