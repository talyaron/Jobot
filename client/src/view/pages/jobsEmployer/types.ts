export type Location = 'onSite' | 'remote' | 'hybrid';
export type LocationType = 'onSite' | 'remote' | 'hybrid';

export interface Job {
  _id: string;
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