import express from "express";
import dotenv from "dotenv";
import schema from "./schema/schema.js";
import { graphqlHTTP } from "express-graphql";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
connectDB();

const server = app.listen(port, () =>
  console.log(`Server listening on ${port}`)
);

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);


