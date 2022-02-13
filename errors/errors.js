handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    console.log(err);
    res.status(err.status).send(err.msg);
  } else next(err);
};

handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};

module.exports = { handleCustomErrors, handleServerErrors };
