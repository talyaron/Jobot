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
	jobs: Job[];
	onCreate: (jobData: Job) => void;
	onDelete: (id: string) => void;
	onEdit: (job: Job | null) => void;
	onEditSave: (jobData: Job) => void;
	jobToEdit: Job | null;
  }

const JobsEmployerMV: React.FC<JobsEmployerMVProps> = ({
	jobs,
	onCreate,
	onDelete,
	onEdit,
	onEditSave,
	jobToEdit,
}) => {
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

	useEffect(() => {
		if (jobToEdit) {
			setFormData({ ...jobToEdit });
		}
	}, [jobToEdit]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		console.log(formData);
		
		if (jobToEdit) {
		   onEditSave(formData);
		} else {
		   onCreate(formData);
		}
	
		setFormData({
		   _id:  jobToEdit?._id || '',
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
							<button onClick={() => onDelete(job._id || '')}>Delete</button>
							<button onClick={() => onEdit(job)}>Edit</button>
						</div>
					))}
			</div>
		</div>
	);
};

export default JobsEmployerMV;
