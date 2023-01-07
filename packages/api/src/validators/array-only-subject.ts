import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SUBJECTS } from '@booking/configs';

@ValidatorConstraint()
export class ArrayOnlySubjectConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean | Promise<boolean> {
    const isSubject = (value: any) => SUBJECTS.includes(value);
    return value.every(isSubject);
  }

  defaultMessage(): string {
    return 'subjects must be a subjects';
  }
}

export function ArrayOnlySubject(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ArrayOnlySubjectConstraint,
    });
  };
}
