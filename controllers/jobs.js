import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const getAllJobs = async (req, res) => {
	const userId = req.user.userId;
	const allJobs = await Job.find({ createdBy: userId })
		.sort({ company: -1 })
		.select("-createdBy -createdAt -updatedAt")
		.limit(10);
	res.status(StatusCodes.OK).json({ success: true, data: allJobs });
};
const getJob = async (req, res) => {
	const jobId = req.params.id;
	const userId = req.user.userId;
	//const {params:{id: jobId},user:{userId}} =req;

	const job = await Job.findOne({ _id: jobId, createdBy: userId }).select(
		"-createdAt -updatedAt"
	);
	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}
	res.status(StatusCodes.OK).json({ success: true, data: job });
};
const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await Job.create({ ...req.body });
	res.status(StatusCodes.CREATED).json({ success: true, data: job });
};
const updateJob = async (req, res) => {
	const {
		body: { company, position },
		params: { id: jobId },
		user: { userId },
	} = req;
	//const {company, position} = req.body;
	if (company === "" || position === "") {
		throw new BadRequestError(`Company or position fields can not be empty`);
	}
	const updatedJob = await Job.findOneAndUpdate(
		{ _id: jobId, createdBy: userId },
		{ company, position },
		{ new: true, runValidators: true }
	);

	if (!updatedJob) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}

	res.status(StatusCodes.OK).json({ success: true, data: updatedJob });
};
const deleteJob = async (req, res) => {
	const {
		params: { id: jobId },
		user: { userId },
	} = req;

	const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

	if (!job) {
		throw new NotFoundError(`No job with id ${jobId}`);
	}
	res.status(StatusCodes.OK).json({ success: true });
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
