import { FileError } from '../classes/FileError';

export type TFile = 'document-file' | 'shop-logo';
export type TFileError = 'minSize' | 'maxSize' | 'mime';

export type TFileCheckHandler = (
  file: File,
  params: TFileCheckParams
) => FileError;

export type TFileValidate = {
  isValid: boolean;
  errors: string[];
};

export type TFileSize = {
  min?: number;
  max?: number;
};

export type TFileCheckParams = {
  mime?: string[];
  min?: number;
  max?: number;
};

export type TDefaultPayload<T> = { data?: T };
export type TImagePayload = {
  preview: string;
};
export type TFilePayload<T = any> = TImagePayload & TDefaultPayload<T>;
export type TPayloadType = 'img';
export type TFileUploadViewMode = 'standard' | 'big';
