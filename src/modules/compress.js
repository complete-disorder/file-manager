import path from "path";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";

const FAILED_OPERATION_MESSAGE = "Operation failed";

const showFailedOperationError = () => console.log(FAILED_OPERATION_MESSAGE);

export const compress = async (path_to_file = "", path_to_destination = "") => {
  const { base = "" } = path.parse(path_to_file);

  const sourcePath = path.resolve(path_to_file);
  const destinationPath = path.resolve(path_to_destination, `${base}.br`);

  const brotZip = createBrotliCompress();

  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  try {
    await pipeline(source, brotZip, destination);
  } catch {
    showFailedOperationError();
  }
};

export const decompress = async (
  path_to_file = "",
  path_to_destination = ""
) => {
  const { name = "" } = path.parse(path_to_file);

  const sourcePath = path.resolve(path_to_file);
  const destinationPath = path.resolve(path_to_destination, name);

  const brotZip = createBrotliDecompress();

  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  try {
    await pipeline(source, brotZip, destination);
  } catch {
    showFailedOperationError();
  }
};
