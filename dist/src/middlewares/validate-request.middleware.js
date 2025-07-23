"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema, property = 'body') => (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: error.details.map(e => e.message).join(', ') });
    }
    next();
};
exports.validateRequest = validateRequest;
