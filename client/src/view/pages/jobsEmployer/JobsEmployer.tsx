import React, { useState, useEffect } from 'react';
import JobsEmployerMV from './JobsEmployerMV';
import { Job } from './JobsEmployerMV';

const JobsEmployer: React.FC = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

	useEffect(() => {
		const fetchJobs = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/employer/jobs/get-all-jobs');
				const data: Job[] = await response.json();
				setJobs(data);
			} catch (error) {
				console.error('Error fetching jobs:', error);
			}
		};
		fetchJobs();
	}, []);

	const createJob = async (jobData: Job) => {
		delete jobData._id;

		const dataToSend = {
			...jobData,
			industry: jobData.Industry,
			createdAt: new Date()
		};

		try {
			const response = await fetch('http://localhost:3000/api/employer/jobs/create', {
				method: 'POST',
				body: JSON.stringify(dataToSend),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				const error = await response.json();
				console.error('Error creating job:', error);
				return;
			}

			const updatedJobs = await fetch('http://localhost:3000/api/employer/jobs/get-all-jobs');
			const data: Job[] = await updatedJobs.json();
			setJobs(data);

		} catch (error) {
			console.error('Error creating job:', error);
		}
	};

	const deleteJob = async (id: string) => {
		try {
			const response = await fetch(`http://localhost:3000/api/employer/jobs/delete/${id}`, {
				method: 'DELETE',
			});
			const result = await response.json();
			if (response.ok) {
				setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
			} else {
				console.error('Error deleting job:', result.error);
			}
		} catch (error) {
			console.error('Error deleting job:', error);
		}
	};

	const editJob = async (jobData: Job) => {
		try {
			const response = await fetch(`http://localhost:3000/api/employer/jobs/edit/${jobData._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jobData),
			});

			const result = await response.json();
			if (response.ok) {
				setJobs((prevJobs) =>
					prevJobs.map((job) => (job._id === jobData._id ? result.job : job))
				);
				setJobToEdit(null);
			} else {
				console.error('Error updating job:', result.error);
			}
		} catch (error) {
			console.error('Error updating job:', error);
		}
	};

	const handleEditSave = (jobData: Job) => {
		editJob(jobData);
	};

	return (
		<div>
			<JobsEmployerMV
				jobs={jobs}
				onCreate={createJob}
				onDelete={deleteJob}
				onEdit={setJobToEdit}
				onEditSave={handleEditSave}
				jobToEdit={jobToEdit}
			/>
		</div>
	);
};

export default JobsEmployer;
