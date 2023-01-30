import { TFilePayload } from '../types/file.types';

export class FileUpload<T extends object = any, P extends TFilePayload = any> {
  public json: T = {} as any;

  constructor(public file: File, public payload: P = null) {}

  public setJSON(json: T) {
    this.json = json;
  }

  public mergeWithJSON(): { file: File } & T {
    const { file, json } = this;

    return { file, ...json };
  }

  public convertToFormData(fileProp: string = 'file'): FormData {
    const formData: FormData = new FormData();

    formData.append(fileProp, this.file);

    Object.entries(this.json).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }
}
