import Joi from 'joi';
import { Colors, Gender, Sports, type Person } from '@/types';

const fileSchema = Joi.object({
  name: Joi.string().required(),
  size: Joi.number().required(),
  type: Joi.string().valid(
    'image/jpeg',
    'image/png',
    'application/pdf'
  ).required(),
  lastModified: Joi.number().required()
});

export const JoiFormSchema: Joi.ObjectSchema<Person> = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(8),
  favouriteFoods: Joi.array()
    .items(
      Joi.string()
        .required()
    )
    .min(2)
    .required()
    .messages({
      'array.base': 'Enter atleast two dishes'
    }),
  resume: fileSchema.required(),
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
  hobby: Joi.string().required(),
  groceryList: Joi.array()
    .items(Joi.string().required())
    .min(2)
    .required()
    .messages({
      'array.base': 'Select atleast two items'
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
  age: Joi.number().required().positive().min(10),
  weight: Joi.number().required().positive().min(10).max(100),
  rating: Joi.number().required().min(1).max(5).messages({
    'number.base': 'Please rate your experience'
  }),
  dob: Joi.date().required(),
  time: Joi.date().required(),
  dateTime: Joi.date().required(),
  bgColor: Joi.string().required(),
  feedback: Joi.string().required()
});
