// src/utils/validation.js
import { check, validationResult } from 'express-validator';

export const validateRequest = async (req) => {
    await Promise.all([
        check("username").trim().escape().notEmpty().withMessage('Username is required').run(req),
        check("password").trim().escape().notEmpty().withMessage('Password is required').run(req),
        // check("role").trim().escape().notEmpty().withMessage('Role is required').run(req),
    ]);
};

export const validateResult = (req) => {
    const errors = validationResult(req);
    return errors;
};
