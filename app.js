import "dotenv/config";
import "express-async-errors";

//extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";

import connectDB from "./db/connect.js";
import express from "express";
import mainRouter from "./routes/index.js";
const app = express();

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());

// extra security middleware packages
app.set("trust proxy", 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, //limit each ip to 100 requests per windowMs
	})
);
app.use(helmet());
app.use(cors());
app.use(xss());

// router
app.use("/api/v1", mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		//connect DB
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
