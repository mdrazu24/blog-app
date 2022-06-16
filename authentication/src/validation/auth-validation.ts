import {body } from 'express-validator'

export const CREATE_ACCOUNT = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('fullName').isLength({min: 5}).withMessage('Full name must be at least 5 characters'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters')
]

export const LOGIN = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters')
 ]