import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import { v4 as uuidv4 } from "uuid"; // Import uuid

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only image file is allowed"), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`; // Generate a unique filename using uuid
    cb(null, uniqueFilename);
  }
});

export const uploadImage = multer({
  storage: storage,
  fileFilter: imageFileFilter
});
