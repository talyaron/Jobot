import React, { useState } from 'react';
import JobsEmployerVM, { Job } from './JobsEmployerVM';

const JobsEmployer: React.FC = () => {
	const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

	return (
		<div>
			<JobsEmployerVM
				jobToEdit={jobToEdit}
				onEditStart={setJobToEdit}
			/>
		</div>
	);
};

export default JobsEmployer;