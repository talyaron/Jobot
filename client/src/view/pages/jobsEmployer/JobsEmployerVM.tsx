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

export interface JobsEmployerVMResult {
    jobs: Job[];
    formData: Job;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deleteJob: (id: string) => Promise<void>;
}

const JobsEmployerVM = ({
    jobToEdit,
    onEditStart,
}: JobsEmployerMVProps): JobsEmployerVMResult => {
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

    // Handle checkbox change
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            housingIncluded: e.target.checked,
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

    return {
        jobs,
        formData,
        handleInputChange,
        handleSubmit,
        handleCheckboxChange,
        deleteJob
    };
};

export default JobsEmployerVM;