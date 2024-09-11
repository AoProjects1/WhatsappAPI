export const globalError = (err, req, res, next) => {
  if (process.env.MODE == "dev") {
    res.json({ err: err.message, stack: err.stack });
  } else {
    res.json({ err: err.message });
  }
}

function catchAsync(fun) {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      next(err);
    });
  };
}
export default catchAsync;