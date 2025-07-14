const uploadImage = require("../services/upload.service");
const { protect } = require("../services/user");
const handleMulterUpload = require("../utils/multer-upload");
const UserRoutes = require("./auth.routes");
const TodoRoutes = require("./todo.routes");

const mountRoutes = (app) => {
  app.use("/api/v1/auth", UserRoutes);
  app.use("/api/v1/todos", TodoRoutes);

  app.post(
    "/upload/image",
    protect,
    handleMulterUpload.single("image"),
    uploadImage
  );
};

module.exports = mountRoutes;
