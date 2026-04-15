import mongoose from 'mongoose';

const connectMongoDB = async () => {
  const mongoUrl = process.env.MONGO_URL;

  await mongoose.connect(mongoUrl);
  console.log('✅ MongoDB connection established successfully');
};

export default connectMongoDB;