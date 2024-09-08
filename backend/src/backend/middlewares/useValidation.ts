import { ValidationError, validationResult } from "express-validator";
import { Request, Response, NextFunction } from 'express';

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorArr: any = [];
  errors.array().forEach(err => errorArr.push({[err.type]: err.msg}));

  return res.status(422).json({
    errors: errorArr
  })
}

export default validate;
