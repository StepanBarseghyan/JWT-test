import jwt from "jsonwebtoken";
async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Access token not found" });
    }

    const decode = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    res.status(450).send({ message: "pordznakan" });
  }
}

export default authenticateToken;
