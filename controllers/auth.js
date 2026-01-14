import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {BadRequestError} from "../errors/index.js";
const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
        throw new BadRequestError("Please provide name, email, and password")
	}
	try {
		const user = await User.create({ ...req.body });
		res.status(StatusCodes.CREATED).json({ success: true });
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: true });
	}
};
const login = async (req, res) => {
	res.send("login user");
};

export { register, login };
