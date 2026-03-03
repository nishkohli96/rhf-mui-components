import { faker } from '@faker-js/faker';

type AirportInfo = {
  iataCode: string;
  name: string;
};

export const generateAirportNames = (count: number) => {
  const fullNames = new Set<AirportInfo>();
  while (fullNames.size < count) {
    fullNames.add(faker.airline.airport());
  }
  return Array.from(fullNames);
};
