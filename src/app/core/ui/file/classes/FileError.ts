import { TFileError } from "../types/file.types";

export class FileError {
  constructor(
    public errorType: TFileError,
    public replaceTag: string = null,
    public replaceValue: string | number = null
  ) { }
}