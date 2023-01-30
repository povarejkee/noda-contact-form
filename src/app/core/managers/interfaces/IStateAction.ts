export interface IStateAction<T extends string = string, P = unknown> {
  type: T;
  payload?: P;
}
