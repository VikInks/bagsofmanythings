// validation JOI schema
import Joi from "joi";

const username = Joi.string().min(3).max(30).required();
const email = Joi.string().email().required();
const password = Joi.string().min(1).max(30).required();
const avatar = Joi.string().uri().required();
const bio = Joi.string().min(3).max(1000);
const language = Joi.string().valid('en', 'fr').required();
const theme = Joi.string().required();
const notifications = Joi.boolean().required();
const id = Joi.string().required();
const role = Joi.string().valid('member', 'admin');

export const signUpSchema = Joi.object({
    username,
    email,
    password,
    avatar
});

export const signInSchema = Joi.object({
    email,
    password
});

export const updateUserSchema = Joi.object({
    id,
    username,
    email,
    password,
    bio,
    avatar,
    role,
    preferences: Joi.object({
        language,
        theme,
        notifications
    })
});
