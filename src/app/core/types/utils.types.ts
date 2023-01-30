export type TMathAction = 'inc' | 'dec';

export type TIfElseObject<T = any> = {
  true: T;
  false: T;
};

export type TArrayItem<T = any> = {
  index: number;
  item: T;
};
