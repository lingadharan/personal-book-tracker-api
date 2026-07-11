import mongoose from 'mongoose';

const dataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
  } catch (error) {
    console.log(`Error occure at DB connection ${error}`);
    process.exit(1);
  }
};

export default dataBaseConnection;
