import Job from "../models/Job.js";

const getAllJobs = async (req, res) => {
	res.send("jobs");
};
const getJob = async (req, res) => {
	res.send("job");
};
const createJob = async (req, res) => {
	res.json(req.user);
};
const updateJob = async (req, res) => {
	res.send("update");
};
const deleteJob = async (req, res) => {
	res.send("delete");
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
