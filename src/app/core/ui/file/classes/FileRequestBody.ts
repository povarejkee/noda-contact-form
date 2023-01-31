export class FileRequestBody<T extends object> {
  constructor(public json: T, public file: File) {}
}
