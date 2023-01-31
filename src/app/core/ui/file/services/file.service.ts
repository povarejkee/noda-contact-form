import { Injectable } from '@angular/core';
import { replace } from '@core/handlers/string.handlers';
import { ExtendsFactory } from '@core/managers/handlers/managers.handlers';
import { State } from '@core/managers/StateService.manager';
import { FileError } from '../classes/FileError';
import { FileDB } from '../db/file.db';
import {
  TFile,
  TFileCheckHandler,
  TFileCheckParams,
  TFileError,
  TFileValidate,
} from '../types/file.types';

@Injectable({
  providedIn: 'root',
})
export class FileService extends ExtendsFactory(State({ db: FileDB })) {
  constructor() {
    super(null, null, FileDB);
  }

  public getFileCheckParams(fileType: TFile): TFileCheckParams {
    const settingsKey = fileType.toLocaleLowerCase();
    const { size = {}, mime = [] } = this.getDataFromDB([
      'settings',
      settingsKey as any,
    ]);

    return { ...size, mime };
  }

  private getErrorMsg = (fileError: FileError): string => {
    const errors: Record<TFileError, string> = this.getDataFromDB([
      'errorMsgs',
    ]);
    const {
      errorType = 'Invalid file',
      replaceTag = '',
      replaceValue = '',
    } = fileError;

    return replace((errors as any)[errorType], replaceTag, replaceValue);
  };

  private completeCheckHandlers(
    this: FileService,
    params: TFileCheckParams
  ): TFileCheckHandler[] {
    const handlers = Object.keys(params).map(
      (key: keyof FileService) => this[key]
    );

    return handlers as TFileCheckHandler[];
  }

  private convertSizeToMb(size: number): number {
    const mb: number = size / 1024 / 1024;

    return Number(mb.toFixed(1));
  }

  public min = (file: File, params: TFileCheckParams): FileError => {
    const isValid = this.convertSizeToMb(file.size) > params.min;

    return isValid ? null : new FileError('minSize', '{{size}}', params.min);
  };

  public max = (file: File, params: TFileCheckParams): FileError => {
    const isValid = this.convertSizeToMb(file.size) < params.max;

    return isValid ? null : new FileError('maxSize', '{{size}}', params.max);
  };

  public mime = (file: File, { mime }: TFileCheckParams): FileError => {
    const isValid: boolean = mime.includes(file.type);

    return isValid ? null : new FileError('mime', '{{mime}}', mime.toString());
  };

  private validate(
    handlers: TFileCheckHandler[],
    params: TFileCheckParams,
    file: File
  ): TFileValidate {
    const errors = handlers
      .map((cb) => cb(file, params))
      .filter(Boolean)
      .map(this.getErrorMsg);

    return {
      isValid: !errors.length,
      errors,
    };
  }

  public checkFile(
    file: File,
    checkParams: TFileCheckParams,
    fileType: TFile
  ): TFileValidate {
    const checkHandlers: TFileCheckHandler[] =
      this.completeCheckHandlers(checkParams);
    const typeErrorMsg: string = this.getDataFromDB([
      'settings',
      fileType,
      'errorMessage',
    ]);
    const { isValid, errors }: TFileValidate = this.validate(
      checkHandlers,
      checkParams,
      file
    );

    return { isValid, errors: [typeErrorMsg] || errors };
  }
}
