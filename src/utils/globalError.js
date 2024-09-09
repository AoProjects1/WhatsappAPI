export const globalError = (err, req, res, next) => {
  res.json({ err: err.message, stack: err.stack });
};
