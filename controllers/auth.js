import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import bcrypt from "bcryptjs";
const register = async (req, res) => {
	 const { name, email, password } = req.body;
	// const salt = await bcrypt.genSalt(10);
	// const hashedPassword = await bcrypt.hash(password, salt);
	// const tempUser = { name, email, password: hashedPassword };


	if (!name || !email || !password) {
		throw new BadRequestError("Please provide name, email, and password");
	}
	try {
		const user = await User.create({...req.body});
		res.status(StatusCodes.CREATED).json({ success: true });
	} catch (error) {
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ success: false, error });
	}
};
const login = async (req, res) => {
	res.send("login user");
};

export { register, login };
