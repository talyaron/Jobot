import React, { useEffect, useState } from 'react';
import { JobsEmployerMV } from './JobsEmployerMV';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';

const JobsEmployer = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/employer/fetch-jobs');
      if (!response.ok) throw new Error('Failed to fetch jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/employer/delete-job/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete job');
      
      await fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <Button onClick={() => setShowModal(true)}>Create New Job</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job._id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{job.jobName}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(job)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(job._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{job.Industry}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm font-semibold mt-2">${job.salary.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{job.term}</p>
              {job.housingIncluded && (
                <p className="text-sm text-green-600">Housing Included</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showModal && (
        <JobsEmployerMV
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
          onSave={() => {
            setShowModal(false);
            fetchJobs();
          }}
        />
      )}
    </div>
  );
};

export default JobsEmployer;