const sanitizeUser = (userDoc) => {
    const user = userDoc.toObject();
    delete user.password;
    delete user.__v;
    return user;
  };

  module.exports = sanitizeUser