import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  //const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  const token = req.cookies.access_token;

  if (token == null) {
    return res.status(400).json({ status: "error", message: "Token nullo" });
  }

  //   const data = jwt.verify(token, process.env.JWT_SECRET)
  //   console.log(data);
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(400).json({ status: "error", message: error.message });
    }

    req.id = user.id;
    req.ruolo = user.ruolo;
    next();
  });
};
