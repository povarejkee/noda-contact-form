export type LocationQuery = {
  name: string;
  country?: string;
  state?: string;
};

export type LocationCountryQuery = Pick<LocationQuery, 'name'>;
export type LocationStateQuery = Required<
  Pick<LocationQuery, 'name' | 'country'>
>;
export type LocationCityQuery = Required<
  Pick<LocationQuery, 'name' | 'country' | 'state'>
>;
