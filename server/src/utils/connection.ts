import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connectToMongo() {
  const dbUrl = config.get<string>("dbUrl");

  try {
    await mongoose.connect(dbUrl);
    logger.info(`Connected to mongo: ${dbUrl}`);
  } catch (error) {
    logger.error(`Could not connect to mongo: ${dbUrl}`);
    process.exit(1);
  }
}

export default connectToMongo;