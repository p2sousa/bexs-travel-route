import { ValidationError } from 'express-validator';
import ValidatorError from '../validator-error';

describe('ValidateError', () => {
  it('create exception validator error successfully.', () => {
    const validationErrors: ValidationError[] = [
      {
        location: 'body',
        param: 'foo',
        value: 'bar',
        msg: 'xpto msg',
      },
    ];

    const errors = { errors: validationErrors };

    const validatorError = new ValidatorError('xpto', errors);

    expect(validatorError.message).toEqual('xpto');
    expect(validatorError.getCode()).toEqual(400);
    expect(validatorError.getErrors()).toMatchObject(errors);
  });

  it('throw exception validator error successfully.', () => {
    const validationErrors: ValidationError[] = [
      {
        location: 'body',
        param: 'foo',
        value: 'bar',
        msg: 'xpto msg',
      },
    ];

    const errors = { errors: validationErrors };

    try {
      throw new ValidatorError('xpto', errors);
    } catch (error) {
      expect(error.message).toEqual('xpto');
      expect(error.getCode()).toEqual(400);
      expect(error.getErrors()).toMatchObject(errors);
    }
  });
});
