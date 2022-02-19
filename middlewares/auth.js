function noAnon(req, res, next) {
  if (req?.session?.currentUser) {
    return next();
  }
  res.status(400).json({ message: "private information. please log in" });
}

function isAnon(req, res, next) {
  if (!req?.session?.currentUser) {
    return next();
  }
  res.status(400).json({ message: "private information. please log in" });
}

module.exports = { noAnon, isAnon };
