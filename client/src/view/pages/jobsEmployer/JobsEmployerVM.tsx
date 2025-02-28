import React, { useState, useEffect, FormEvent } from 'react';

// Job enums
export enum Term {
	short = "short",
	long = "long",
}

export enum LocationType {
	onSite = "onSite",
	remote = "remote",
	hybrid = "hybrid",
}

export enum Location {
	north = "north",
	center = "center",
	south = "south",
	abroad = "abroad",
}

export interface Job {
	_id?: string;
	jobName: string;
	details: string;
	address: string;
	location: Location; 
	locationType: string;
	company: string;
	employmentType: string;
	Industry: string;
	salary: number;
	housingIncluded: boolean;
	type: string;
	term: string;
	benefits: string;
	websiteURL: string;
}

interface JobsEmployerMVProps {
	jobToEdit: Job | null;
	onEditStart: (job: Job | null) => void;
}

const JobsEmployerVM: React.FC<JobsEmployerMVProps> = ({
	jobToEdit,
	onEditStart,
}) => {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [formData, setFormData] = useState<Job>({
		_id: '',
		jobName: '',
		details: '',
		address: '',
		location: Location.north,
		locationType: LocationType.onSite,
		company: '',
		employmentType: '',
		Industry: '',
		salary: 0,
		housingIncluded: false,
		type: '',
		term: Term.short, 
		benefits: '',
		websiteURL: '',
	});

	// Fetch jobs on component mount
	useEffect(() => {
		fetchJobs();
	}, []);

	// Update form data when jobToEdit changes
	useEffect(() => {
		if (jobToEdit) {
			setFormData({ ...jobToEdit });
		}
	}, [jobToEdit]);

	// API request to get all jobs
	const fetchJobs = async () => {
		try {
			const response = await fetch('http://localhost:3000/api/employer/jobs/get-all-jobs');
			const data: Job[] = await response.json();
			setJobs(data);
		} catch (error) {
			console.error('Error fetching jobs:', error);
		}
	};

	// API request to create a new job
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

			fetchJobs(); // Refresh jobs list after creation

		} catch (error) {
			console.error('Error creating job:', error);
		}
	};

	// API request to delete a job
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

	// API request to edit an existing job
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
				onEditStart(null); // Reset the edit state
			} else {
				console.error('Error updating job:', result.error);
			}
		} catch (error) {
			console.error('Error updating job:', error);
		}
	};

	// Handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log(formData);
		
		if (jobToEdit) {
			editJob(formData);
		} else {
			createJob(formData);
		}
	
		// Reset form data
		setFormData({
			_id: '',
			jobName: '',
			details: '',
			address: '',
			location: Location.north,
			locationType: LocationType.onSite,
			company: '',
			employmentType: '',
			Industry: '',
			salary: 0,
			housingIncluded: false,
			type: '',
			term: Term.short,
			benefits: '',
			websiteURL: '',
		});
	};

	return (
		<div>
			<h2>{jobToEdit ? 'Edit Job' : 'Create New Job'}</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="jobName"
					value={formData.jobName}
					onChange={handleInputChange}
					placeholder="Job Name"
					required
				/>
				<input
					type="text"
					name="details"
					value={formData.details}
					onChange={handleInputChange}
					placeholder="Details"
					required
				/>
				<input
					type="text"
					name="address"
					value={formData.address}
					onChange={handleInputChange}
					placeholder="Address"
					required
				/>
				<select
					name="location"
					value={formData.location}
					onChange={handleInputChange}
				>
					{Object.values(Location).map((location) => (
						<option key={location} value={location}>
							{location.charAt(0).toUpperCase() + location.slice(1)}
						</option>
					))}
				</select>
				<select
					name="locationType"
					value={formData.locationType}
					onChange={handleInputChange}
				>
					{Object.values(LocationType).map((type) => (
						<option key={type} value={type}>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</option>
					))}
				</select>
				<input
					type="text"
					name="company"
					value={formData.company}
					onChange={handleInputChange}
					placeholder="Company"
					required
				/>
				<input
					type="text"
					name="employmentType"
					value={formData.employmentType}
					onChange={handleInputChange}
					placeholder="Employment Type"
					required
				/>
				<input
					type="text"
					name="Industry"
					value={formData.Industry}
					onChange={handleInputChange}
					placeholder="Industry"
					required
				/>
				<input
					type="number"
					name="salary"
					value={formData.salary}
					onChange={handleInputChange}
					placeholder="Salary"
					required
				/>
				<input
					type="checkbox"
					name="housingIncluded"
					checked={formData.housingIncluded}
					onChange={(e) =>
						setFormData({
							...formData,
							housingIncluded: e.target.checked,
						})
					}
				/>
				<label>Housing Included</label>
				<input
					type="text"
					name="type"
					value={formData.type}
					onChange={handleInputChange}
					placeholder="Job Type"
					required
				/>
				<select
					name="term"
					value={formData.term}
					onChange={handleInputChange}
				>
					{Object.values(Term).map((term) => (
						<option key={term} value={term}>
							{term.charAt(0).toUpperCase() + term.slice(1)}
						</option>
					))}
				</select>
				<input
					type="text"
					name="benefits"
					value={formData.benefits}
					onChange={handleInputChange}
					placeholder="Benefits"
					required
				/>
				<input
					type="text"
					name="websiteURL"
					value={formData.websiteURL}
					onChange={handleInputChange}
					placeholder="Website URL"
					required
				/>
				<button type="submit">{jobToEdit ? 'Save Changes' : 'Create Job'}</button>
			</form>
			<div>
				<h3>All Jobs</h3>
				{jobs &&
					jobs.map((job) => (
						<div key={job._id}>
							<h4>{job.jobName}</h4>
							<button onClick={() => deleteJob(job._id || '')}>Delete</button>
							<button onClick={() => onEditStart(job)}>Edit</button>
						</div>
					))}
			</div>
		</div>
	);
};

export default JobsEmployerVM;