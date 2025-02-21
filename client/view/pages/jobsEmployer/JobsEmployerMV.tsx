import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Types and Enums
enum LocationType {
    REMOTE = 'remote',
    ONSITE = 'onsite',
    HYBRID = 'hybrid'
  }
  
  enum Term {
    PERMANENT = 'permanent',
    TEMPORARY = 'temporary',
    CONTRACT = 'contract'
  }
  
  interface Job {
    _id: string;
    jobName: string;
    details: string;
    address: string;
    locationType: LocationType;
    location: string;
    company: string;
    employmentType: string;
    Industry: string;
    salary: number;
    housingIncluded: boolean;
    type: string;
    term: Term;
    benefits: string;
    websiteURL?: string;
    createdAt: Date;
  }
  
  interface JobFormData {
    jobName: string;
    details: string;
    address: string;
    locationType: LocationType;
    location: string;
    company: string;
    employmentType: string;
    Industry: string;
    salary: number;
    housingIncluded: boolean;
    type: string;
    term: Term;
    benefits: string;
    websiteURL?: string;
  }

  export const JobsEmployerMV: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);
    const [formData, setFormData] = useState<JobFormData>({
      jobName: '',
      details: '',
      address: '',
      locationType: LocationType.ONSITE,
      location: '',
      company: '',
      employmentType: '',
      Industry: '',
      salary: 0,
      housingIncluded: false,
      type: '',
      term: Term.PERMANENT,
      benefits: '',
      websiteURL: ''
    });
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const url = editingJob 
          ? `/api/jobs/${editingJob._id}`
          : '/api/jobs';
        
        const method = editingJob ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) throw new Error('Failed to save job');
        
        setIsOpen(false);
        resetForm();
      } catch (error) {
        console.error('Error saving job:', error);
      }
    };
  
    const resetForm = () => {
      setFormData({
        jobName: '',
        details: '',
        address: '',
        locationType: LocationType.ONSITE,
        location: '',
        company: '',
        employmentType: '',
        Industry: '',
        salary: 0,
        housingIncluded: false,
        type: '',
        term: Term.PERMANENT,
        benefits: '',
        websiteURL: ''
      });
      setEditingJob(null);
    };
  
    const handleChange = (name: keyof JobFormData, value: string | number | boolean) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingJob ? 'Edit Job' : 'Create New Job'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Job Title"
                  value={formData.jobName}
                  onChange={e => handleChange('jobName', e.target.value)}
                />
              </div>
              <div>
                <Input
                  placeholder="Company ID"
                  value={formData.company}
                  onChange={e => handleChange('company', e.target.value)}
                />
              </div>
            </div>
  
            <Textarea
              placeholder="Job Details"
              value={formData.details}
              onChange={e => handleChange('details', e.target.value)}
            />
  
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.locationType}
                onValueChange={value => handleChange('locationType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location Type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(LocationType).map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
  
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={e => handleChange('location', e.target.value)}
              />
            </div>
  
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.term}
                onValueChange={value => handleChange('term', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Term).map(term => (
                    <SelectItem key={term} value={term}>
                      {term.charAt(0).toUpperCase() + term.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
  
              <Input
                type="number"
                placeholder="Salary"
                value={formData.salary}
                onChange={e => handleChange('salary', Number(e.target.value))}
              />
            </div>
  
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="housingIncluded"
                checked={formData.housingIncluded}
                onChange={e => handleChange('housingIncluded', e.target.checked)}
                className="form-checkbox"
              />
              <label htmlFor="housingIncluded">Housing Included</label>
            </div>
  
            <Input
              placeholder="Website URL"
              value={formData.websiteURL}
              onChange={e => handleChange('websiteURL', e.target.value)}
            />
  
            <Textarea
              placeholder="Benefits"
              value={formData.benefits}
              onChange={e => handleChange('benefits', e.target.value)}
            />
  
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingJob ? 'Update Job' : 'Create Job'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };