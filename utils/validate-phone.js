const { parsePhoneNumberFromString } = require("libphonenumber-js");
const ApiError = require("./apiError");

const validatePhone = (phone, country) => {
  const parsed = parsePhoneNumberFromString(phone, country);

  if (!parsed || !parsed.isValid()) {
    throw new ApiError("Invalid phone number for selected country", 400);
  }

  return parsed.number;
};

module.exports = validatePhone;
