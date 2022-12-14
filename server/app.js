//dependencies

require("dotenv").config();
require("express-async-errors");
const { clientURL } = require("./URI");
const express = require("express");
const connectDB = require("./db/connect");
const path = require("path");

//security dependencies

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//app initialization

const app = express();
const PORT = process.env.PORT || 5000;

//Routes

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

//middle wares

const errorHandlerMiddleware = require("./middleware/error-handler");
const authorizationMiddleware = require("./middleware/authorization");
const notFoundMiddleware = require("./middleware/not-found");

app.use(xss());
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: clientURL }));

app.get("/", (req, res) => {
	res.status(200).json({ message: "welcome" });
});

app.use(express.static("public"));

//routes

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", authorizationMiddleware, productRouter);
app.use("/api/v1/users", authorizationMiddleware, userRouter);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

start();
