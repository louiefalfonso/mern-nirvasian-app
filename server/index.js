import express from "express";
import dotenv from "dotenv";
import schema from "./schema/schema.js";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewares.js";
import routes from "./routes/index.js";

//config
dotenv.config();

//set port
const port = process.env.PORT || 5000;

//connect to db
const app = express();

//connect to db
connectDB();

//cors
app.use(cors());

//morgan
app.use(morgan("dev"));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(express.json());

//cookie parser
app.use(cookieParser());

// Parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

//routes
app.use("/api", routes);

//error middlewares
app.use(routeNotFound);
app.use(errorHandler);

//log requests
const server = app.listen(port, () =>
  console.log(`Server listening on ${port}`)
);


