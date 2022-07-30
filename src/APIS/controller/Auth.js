const { user } = require("../model/Users");
const authValidator = require("../../Validators/authValidator");
const hashPassword = require("../../middlewares/hashPassword");
const verifyPassword = require("../../middlewares/verifyPassword");
const createJWT = require("../../middlewares/createJWT");
const decryptJWT = require("../../middlewares/decryptJWT");
//login Route
const login = async (req, res, next) => {
  try {
    const { emailUser, password } = req.body;
    const userData = { emailUser, password };
    //checking the results frim result JOI library
    const result = authValidator("emailUser password", userData);
    if (!result) {
      res.status(400).json({
        status: false,
        message: "Validation Error (Please Check Your Inputs)",
      });
    } else {
      //fidning the user
      const findUser = await user.findOne({ emailUser: emailUser });
      console.log(findUser.passwordHash);
      if (!findUser) {
        res.status(404).json({
          status: false,
          message: "User does not exist",
        });
      } else {
        //verifying the passwor d
        const verifiedPassword = await verifyPassword(
          password,
          findUser.passwordHash
        );
        if (!verifiedPassword) {
          return res.status(400).json({
            status: false,
            message: "Password is incorrect",
          });
        }
        res.status(200).json({
          status: true,
          message: "login SuccessFul",
          token: await createJWT(findUser),
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

//signup user
const signup = async (req, res, next) => {
  try {
    const { name, emailUser, password, phoneNumber, userName } = req.body;
    const userData = { name, emailUser, password, phoneNumber, userName };
    //checking the results frim result JOI library
    const result = authValidator(
      "name emailUser password phoneNumber userName",
      userData
    );
    if (!result) {
      res.status(400).json({
        status: false,
        message: "Validation Error (Please Check Your Inputs)",
      });
    } else {
      //checking if the user already exists
      const findUser = await user.findOne({$or: [{userName: userName}, {emailUser: emailUser}] });
      if (findUser) {
        res.status(400).json({
          status: false,
          message: "User Already Exists",
        });
      } else {
        //hashing the password
        const { generateSalt, generateHash } = await hashPassword(password);
        console.log(generateSalt, generateHash);
        userData.passwordHash = generateHash;
        userData.passwordSalt = generateSalt;
        //creating  the user
        const createUser = await new user(userData).save();
        if (!createUser) {
          res.status(404).json({
            status: false,
            message: "User not created",
          });
        } else {
          await createUser.save();
          res.status(200).json({
            status: true,
            message: "User created",
            data: createUser,
            count: await user.count(),
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

module.exports = {
  login,
  signup,
};
