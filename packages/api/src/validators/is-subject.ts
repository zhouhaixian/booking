import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { SUBJECTS } from '@booking/configs';

@ValidatorConstraint()
export class IsSubjectConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean | Promise<boolean> {
    return SUBJECTS.includes(value);
  }

  defaultMessage(): string {
    return 'subject must be a subject';
  }
}

export function IsSubject(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSubjectConstraint,
    });
  };
}
