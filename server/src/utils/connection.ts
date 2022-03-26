import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

export default async function connectToDatabase() {
  const dbUri = config.get<string>("dbUri");

  try {
    const connection = await mongoose.connect(dbUri);
    logger.info(`Connected to Mongo: ${dbUri}`);
    return connection;
  } catch (e) {
    logger.error(`Could not connect to Mongo: ${dbUri}`);
    process.exit(1);
  }
}

export async function dropDatabase(){
    const dbUri = config.get<string>("dbUrl");

    try {
      await (await connectToDatabase()).connection.dropDatabase();
      logger.info(`database Dropped: ${dbUri}`);
    } catch (error) {
      logger.error(`Could not drop MongoDB: ${dbUri}`);
      process.exit(1);
    }
}