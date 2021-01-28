/* eslint-disable no-template-curly-in-string */

// https://github.com/jquense/yup/blob/master/src/locale.js

const mixed = {
  default: '${path} is invalid',
  required: '${path} обязательное поле',
  oneOf: '${path} must be one of the following values: ${values}',
  notOneOf: '${path} must not be one of the following values: ${values}',
  //   notType: ({ path, type, value, originalValue }) => {
  //     let isCast = originalValue != null && originalValue !== value;
  //     let msg =
  //       `${path} must be a \`${type}\` type, ` +
  //       `but the final value was: \`${printValue(value, true)}\`` +
  //       (isCast
  //         ? ` (cast from the value \`${printValue(originalValue, true)}\`).`
  //         : '.');

  //     if (value === null) {
  //       msg += `\n If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
  //     }

  //     return msg;
  //   },
  defined: '${path} must be defined',
};

const string = {
  length: '${path} must be exactly ${length} characters',
  min: '${path} должно быть не менее ${min} символов',
  max: '${path} должно быть не более ${max} символов',
  matches: '${path} должно соответствовать формату: "${regex}"',
  email: '${path} must be a valid email',
  url: '${path} must be a valid URL',
  uuid: '${path} must be a valid UUID',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string',
};

const number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  notEqual: '${path} must be not equal to ${notEqual}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer',
};

const date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}',
};

const boolean = {};

const object = {
  noUnknown: '${path} field has unspecified keys: ${unknown}',
};

const array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
};

const yupLocale = {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};

export default yupLocale;
