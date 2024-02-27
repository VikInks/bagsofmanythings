import Joi from "joi";

const username = Joi.string().min(3).max(30).required();
const email = Joi.string().email().required();
const password = Joi.string().min(8).max(30).required(); // Adjusted min length for better security
const avatar = Joi.string().uri().allow('', null); // Made optional and allowed empty string or null
const bio = Joi.string().min(3).max(1000).allow('', null); // Made optional and allowed empty string or null
const language = Joi.string().valid('en', 'fr').required();
const theme = Joi.string().required();
const notifications = Joi.boolean().required();
const accountType = Joi.string().valid('free', 'premium', 'friend').required();

export const signUpSchema = Joi.object({
    username,
    email,
    password,
    avatar: avatar.optional(),
    bio: bio.optional(),
    preferences: Joi.object({
        language: language.optional(),
        theme: theme.optional(),
        notifications: notifications.optional(),
    }).optional()
});

export const signInSchema = Joi.object({
    email,
    password
});

export const updateUserSchema = Joi.object({
    username: username.optional(),
    email: email.optional(),
    password: password.optional(), // Password updates may be handled separately
    bio: bio.optional(),
    avatar: avatar.optional(),
    preferences: Joi.object({
        language: language.optional(),
        theme: theme.optional(),
        notifications: notifications.optional(),
    }).optional()
});

export const updateAccountTypeSchema = Joi.object({
    accountType: accountType.required()
});

export const idSchema = Joi.object({
    id: Joi.string().required()
});
