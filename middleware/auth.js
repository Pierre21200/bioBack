const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    if (currentDate > expirationDate) {
      throw new Error("Token expiré!");
    } else {
      const userId = decodedToken.userId;
      const user = await User.findOne({ _id: userId });
      if (!user) {
        throw new Error("Utilisateur non trouvé !");
      }

      req.auth = {
        userId: userId,
      };
    }

    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
