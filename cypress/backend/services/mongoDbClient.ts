import { MongoClient } from "mongodb";

const mongoDbClient = new MongoClient(
  `${process.env.MONGODB_URI}/${process.env.DATABASE}?retryWrites=true&w=majority`
);

export default mongoDbClient;
