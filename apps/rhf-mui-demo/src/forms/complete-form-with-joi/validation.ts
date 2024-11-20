import Joi from 'joi';
import { Moment } from 'moment';
import { Colors, Gender, Sports } from '@/types';

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

export const JoiFormSchema: Joi.ObjectSchema<Person> = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
  favouriteColor: Joi.string()
    .required()
    .valid(...Object.values(Colors))
    .messages({
      'any.only': 'Select a Color'
    }),
  sports: Joi.array()
    .items(
      Joi.string()
        .required()
        .valid(...Object.values(Sports))
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Select atleast one sport'
    }),
  iplTeams: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      'array.base': 'Select atleast one country'
    }),
  favouriteSport: Joi.string()
    .required()
    .valid(...Object.values(Sports))
    .messages({
      'any.only': 'Select a sport'
    }),
  agreeTnC: Joi.boolean().required().valid(true).messages({
    'any.only': 'Please agree to the Terms & Conditions'
  }),
  colors: Joi.array()
    .items(
      Joi.string()
        .required()
        .valid(...Object.values(Colors))
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Select atleast one color'
    }),
  countries: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      'array.base': 'Select atleast one country'
    }),
  gender: Joi.string()
    .required()
    .valid(...Object.values(Gender))
    .messages({
      'any.only': 'Select gender'
    }),
  country: Joi.string().required(),
  countryCode: Joi.string().required(),
  phoneNumber: Joi.string().required().min(8),
  darkTheme: Joi.boolean().required(),
  age: Joi.number().required().positive(),
  rating: Joi.number().required().min(1).max(5).messages({
    'number.base': 'Please rate your experience'
  }),
  dob: Joi.date().required(),
  time: Joi.date().required(),
  dateTime: Joi.date().required(),
  bgColor: Joi.string().required(),
  feedback: Joi.string().required()
});
