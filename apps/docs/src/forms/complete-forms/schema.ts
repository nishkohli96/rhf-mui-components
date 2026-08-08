/**
 * Joi schema + validator used by the TanStack complete form. `validateWithJoi`
 * runs the whole schema and returns TanStack's form-validator shape
 * (`{ fields }`), so each field's `meta.errors` is populated from Joi.
 */

import Joi from 'joi';
import { type CompleteFormValues, isBlankHtml } from './data';

export const completeFormSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'At least 2 characters',
    'any.required': 'First name is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password must be at least 8 characters',
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password must be at least 8 characters'
  }),
  age: Joi.number().min(18).required().messages({
    'number.base': 'Age is required',
    'number.min': 'Must be 18 or older',
    'any.required': 'Age is required'
  }),
  role: Joi.string().required().messages({
    'string.empty': 'Select a role',
    'any.required': 'Select a role'
  }),
  framework: Joi.string().required().messages({
    'string.empty': 'Choose a framework',
    'any.required': 'Choose a framework'
  }),
  city: Joi.object().required().messages({
    'object.base': 'Select your city',
    'any.required': 'Select your city'
  }),
  country: Joi.object().required().messages({
    'object.base': 'Select your country',
    'any.required': 'Select your country'
  }),
  contact: Joi.string().required().messages({
    'string.empty': 'Choose a contact method',
    'any.required': 'Choose a contact method'
  }),
  rating: Joi.number().min(1).required().messages({
    'number.base': 'A rating is required',
    'any.required': 'A rating is required'
  }),
  dob: Joi.object().required().messages({
    'object.base': 'Date of birth is required',
    'any.required': 'Date of birth is required'
  }),
  phone: Joi.object({
    phoneNo: Joi.string().min(1).required().messages({
      'string.empty': 'Enter your phone number',
      'string.min': 'Enter your phone number',
      'any.required': 'Enter your phone number'
    })
  })
    .unknown(true)
    .required()
    .messages({
      'object.base': 'Enter your phone number',
      'any.required': 'Enter your phone number'
    }),
  bio: Joi.string()
    .required()
    .custom((value, helpers) => (isBlankHtml(value) ? helpers.error('any.invalid') : value))
    .messages({
      'string.empty': 'Add a short bio',
      'any.required': 'Add a short bio',
      'any.invalid': 'Add a short bio'
    }),

  /* Fields without validation rules — still declared so the object is valid. */
  tags: Joi.array().items(Joi.string()),
  avatar: Joi.any(),
  priority: Joi.string(),
  skills: Joi.array().items(Joi.string()),
  visitedCities: Joi.array(),
  subscribe: Joi.boolean(),
  hobbies: Joi.array().items(Joi.string()),
  notifications: Joi.boolean(),
  volume: Joi.number(),
  meetingTime: Joi.any(),
  appointment: Joi.any(),
  brandColor: Joi.string()
});

/**
 * Runs the Joi schema and returns TanStack Form's form-validator result:
 * `{ fields }` maps each field path to its first error message, which
 * TanStack propagates to that field's `meta.errors`.
 */
export function validateWithJoi(value: CompleteFormValues) {
  const { error } = completeFormSchema.validate(value, { abortEarly: false });
  if (!error) {
    return undefined;
  }
  const fields: Record<string, string> = {};
  for (const detail of error.details) {
    const key = String(detail.path[0] ?? '');
    if (key && !(key in fields)) {
      fields[key] = detail.message;
    }
  }
  return { fields };
}
