import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SEXS } from '@booking/configs';

@ValidatorConstraint()
export class IsSexConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    return SEXS.includes(value);
  }

  defaultMessage(): string {
    return 'sex must be a sex';
  }
}

export function IsSex(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSexConstraint,
    });
  };
}
