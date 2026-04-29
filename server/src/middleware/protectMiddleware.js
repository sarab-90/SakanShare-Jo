import jwt from "jsonwebtoken";
export const protect = (req, res, next) => {
  let token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  console.log("token: ", token);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. No token ",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Decoded User: ", req.user);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized. Invalid token",
    });
  }
};
