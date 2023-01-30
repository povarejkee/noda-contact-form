import { isJSType, isNullish } from '@core/handlers/condition.handlers';
import { FileUpload } from '../classes/FileUpload';

export function extname(file: File): string {
  return file.name.match(/[.]\w+$/)[0];
}

export function covertArrayToFormData<T extends object = null>(
  items: FileUpload<T>[],
  fieldName: string,
  fileProp: string = 'file'
): FormData {
  const formData = new FormData();

  items
    .map((item) => item.mergeWithJSON())
    .forEach((json, index) => {
      const formDataKey: string = `${fieldName}[${index}]`;

      Object.entries(json).forEach(([key, value]: [string, any]) => {
        const isConvertToJSON: boolean =
          (key !== fileProp && !isJSType(value, 'string')) || isNullish(value);

        key = `${formDataKey}.${key}`;
        value = isConvertToJSON ? JSON.stringify(value) : value;

        formData.append(key, value);
      });
    });

  return formData;
}

export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    if (!file) return resolve(null);

    const reader = new FileReader();

    reader.addEventListener('load', (e) => {
      resolve((e.target as any).result);
    });

    reader.readAsDataURL(file);
  });
}

export function filename(url: string): string {
  return isNullish(url) ? url : url.split('/').pop();
}

export function removeFilename(url: string): string {
  if (isNullish(url)) return url;
  const urlArr: string[] = url.split('/');

  urlArr.pop();

  return urlArr.join('/');
}
