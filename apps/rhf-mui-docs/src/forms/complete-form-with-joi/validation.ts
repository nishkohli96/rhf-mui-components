import Joi from 'joi';
import { Moment } from 'moment';
import {
  Colors,
  Gender,
  Sports,
} from '@site/src/types';

export type Person = {
  email: string;
  password: string;
  dob: Moment | null;
  time: Moment | null;
  dateTime: Moment | null;
  age: number;
  gender: Gender | null;
  country: string;
  favouriteSport: Sports | '';
  sports: string[];
  iplTeams:  string[];
	countries: string[] | null;
  favouriteColor: Colors | '',
  color: Colors[] | null;
  rating: number | null;
  darkTheme: boolean;
  agreeTnC: boolean;
};

export const JoiFormSchema: Joi.ObjectSchema<Person> = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
  age: Joi.number().required().positive(),
  gender: Joi.string()
    .required()
    .valid(...Object.values(Gender))
    .messages({
      'any.only': 'Select gender'
    }),
  country: Joi.string().required(),
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
  favouriteSport: Joi.string()
    .required()
    .valid(...Object.values(Sports))
    .messages({
      'any.only': 'Select a sport'
    }),
  iplTeams: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      'array.base': 'Select atleast one country'
    }),
  countries: Joi.array()
    .items(Joi.string().required())
    .min(1)
    .required()
    .messages({
      'array.base': 'Select atleast one country'
    }),
  dob: Joi.date().required(),
  time: Joi.date().required(),
  dateTime: Joi.date().required(),
  favouriteColor: Joi.string()
    .required()
    .valid(...Object.values(Colors))
    .messages({
      'any.only': 'Select a Color'
    }),
  color: Joi.array()
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
  darkTheme: Joi.boolean().required(),
  rating: Joi.number().required().min(1).max(5).messages({
    'number.base': 'Please rate your experience'
  }),
  agreeTnC: Joi.boolean().required().valid(true).messages({
    'any.only': 'Please agree to the Terms & Conditions'
  })
});
