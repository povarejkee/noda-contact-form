export type OptionParams = {
  title: string;
  icon: string;
  url: string;
};

export interface IOption<
  T extends Array<keyof OptionParams> = [],
  V extends object = object
> {
  id: unknown;
  params?: {
    [K in T[number]]: OptionParams[K];
  } & V;
}
