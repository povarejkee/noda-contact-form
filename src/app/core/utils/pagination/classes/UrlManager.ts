export class UrlManager<T extends object = any> {
  public url: URL;

  constructor(url: string) {
    this.url = new URL(url);
  }

  public setParam<K extends keyof T & string>(key: K, value: T[K]): string {
    this.url.searchParams.set(key, String(value));

    return this.url.toString();
  }

  public setParams(params: Partial<T>) {
    Object.entries(params).forEach(([key, value]) => {
      this.setParam(key as keyof T & string, value as T[keyof T & string]);
    });

    this.url.hostname = '';

    return this.url.toString();
  }

  public getParam<K extends keyof T & string>(key: K): T[K] {
    const parameter: string = this.url.searchParams.get(key);

    return JSON.parse(parameter);
  }

  public queryParams(): T {
    const queryParams = {} as T;

    for (let [name, value] of this.url.searchParams as any) {
      queryParams[name as keyof T] = value;
    }

    return queryParams;
  }
}
