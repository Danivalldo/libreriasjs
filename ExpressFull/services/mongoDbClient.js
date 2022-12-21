import { MongoClient } from "mongodb";

const mongoDbClient = new MongoClient(process.env.MONGODB_URI);

export default mongoDbClient;
