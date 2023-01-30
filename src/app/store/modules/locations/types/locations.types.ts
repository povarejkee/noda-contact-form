export type LocationQuery = {
  name: string;
  country?: string;
  state?: string;
};

export type LocationCountryQuery = Pick<LocationQuery, 'name'>;
