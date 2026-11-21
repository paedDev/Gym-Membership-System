const validate = (schema) => (req, _res, next) => {
  req.body = schema.parse(req.body); // ZodError goes to errorHandler
  next();
};

export default validate;
