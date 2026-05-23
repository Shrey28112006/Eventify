import jwt from "jsonwebtoken";

function generateToken(userId) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing. Add it to your .env file.");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
}


export default generateToken;
