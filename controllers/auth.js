import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
	const { name, email, password } = req.body;
	// const salt = await bcrypt.genSalt(10);
	// const hashedPassword = await bcrypt.hash(password, salt);
	// const tempUser = { name, email, password: hashedPassword };

	if (!name || !email || !password) {
		throw new BadRequestError("Please provide name, email, and password");
	}

	const user = await User.create({ ...req.body });

	const payload = { userId: user._id, name: user.name };
	const token = await jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
	res
		.status(StatusCodes.CREATED)
		.json({ success: true, data: user.getName(), token }); // mo ngoose instance method
};
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please prvide email and password");
	}

	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	//compare passwords
	const isPasswordCorrect = await user.comparePasswords(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid credentials");
	}
	const token = user.createJWT();
	res
		.status(StatusCodes.OK)
		.json({ success: true, data: user.getName(), token });
};

export { register, login };
