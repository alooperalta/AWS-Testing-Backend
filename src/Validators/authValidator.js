const Joi = require("joi");

module.exports = (checks, data) => {
  let check = {};
  let checkList = {
    emailUser: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    phoneNumber: Joi.string().required(),
    name: Joi.string().min(3).required(),
    userName: Joi.string().required(),
  };

  checks.split(" ").forEach((key) => {
    let trimmedKey = key.trim();

    if (trimmedKey && checkList[trimmedKey]) {
      check[`${trimmedKey}`] = checkList[`${trimmedKey}`];
    }
  });

  const schema = Joi.object(check);

  const { error } = schema.validate(data);

  if (error) {
    return false;
  }
  return true;
};
