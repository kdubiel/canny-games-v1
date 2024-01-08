import Joi from 'joi';
import { JoiValidationException } from '../exceptions/joi-validation.exception';
import type { PipeTransform } from '@nestjs/common';

export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.Schema) {}

  transform(value: any) {
    const { error, value: transformedValue } = this.schema.validate(value, {
      abortEarly: false,
    });

    if (error) {
      // TODO: Improve
      throw new JoiValidationException(
        error.details.reduce((errors, errorDetails) => {
          errors[errorDetails.path[0]] = {
            type: errorDetails.type,
            message: errorDetails.message,
          };
          return errors;
        }, {}),
      );
    }

    return transformedValue;
  }
}
