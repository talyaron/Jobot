import React, { useState } from 'react';
import JobsEmployerVM, { Job, Location, LocationType, Term } from './JobsEmployerVM';

const JobsEmployer: React.FC = () => {
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
    
    const {
        jobs,
        formData,
        handleInputChange,
        handleSubmit,
        handleCheckboxChange,
        deleteJob
    } = JobsEmployerVM({
        jobToEdit,
        onEditStart: setJobToEdit,
    });
    
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
                    onChange={handleCheckboxChange}
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
                            <button onClick={() => setJobToEdit(job)}>Edit</button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default JobsEmployer;