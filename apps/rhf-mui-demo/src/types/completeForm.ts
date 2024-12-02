import { Moment } from 'moment';
import { Colors, Gender, Sports } from './enums';

export type Person = {
  email: string;
  password: string;
  favouriteColor: Colors | '';
  sports: string[];
  iplTeams: string[];
  favouriteSport: Sports | '';
  agreeTnC: boolean;
  colors: Colors[] | null;
  countries: string[] | null;
  hobby: string;
  groceryList: string[];
  gender: Gender | null;
  country: string;
  countryCode?: string;
  phoneNumber?: string;
  darkTheme: boolean;
  age: number;
  rating: number | null;
  dob: Moment | null;
  time: Moment | null;
  dateTime: Moment | null;
  bgColor: string;
  feedback: string;
};
