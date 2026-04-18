import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res) => {
  const file = req.file;

  if (!file) {
    throw createHttpError(400, 'No file');
  }

  const uploadedImage = await saveFileToCloudinary(file.buffer);

  await User.findByIdAndUpdate(req.user._id, {
    avatar: uploadedImage.secure_url,
  });

  res.status(200).json({
    url: uploadedImage.secure_url,
  });
};