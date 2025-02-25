import { employmentType, location, locationType, term } from "./utils/modelEnums";

export interface Job {
    _id: string;
    jobName: string;
    details: string;
    address: string;
    locationType: locationType;
    location: location;
    company: string; 
    employmentType: employmentType;
    Industry: string;
    salary: number;
    housingIncluded: boolean;
    type: string;
    term: term;
    benefits: string;
    websiteURL?: string;
    createdAt: Date;
  }
