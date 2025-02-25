import { useEffect } from "react";
import { Job } from "../../../model/jobModel";
import { employmentType, location, locationType, term } from "../../../model/utils/modelEnums";
import { User } from "../../../model/userModel";

const JobApplicationVM = () => {
  //fake job for now because we cant pull it from the api yet
  const job: Job = {
    _id: "123456",
    jobName: "Software Engineer",
    details:
      "Develop and maintain web applications using TypeScript and Node.js.",
    address: "123 Tech Street, Haifa, Israel",
    locationType: locationType.onSite,
    location: location.north,
    company: "TechCorp",
    employmentType: employmentType["full time"],
    Industry: "Technology",
    salary: 1000000,
    housingIncluded: false,
    type: "Permanent",
    term: term.long,
    benefits: "Health, Dental, 401(k), Remote Flexibility",
    websiteURL: "https://techcorp.com",
    createdAt: new Date(),
  };
  const user: User = {
    _id: "123456",
    fullName: "John Doe",
    email: "johndoe@example.com",
    password: "securePassword123",
    phoneNumber: "+1234567890",
    aiData: "AI-powered recommendation data",
    workExperience: "5 years of software engineering experience in various industries.",
    isHiring: false,
    isCandidate: false,
  };
  useEffect(()=>{
    getJobSelected();
  },[])
 async function getJobSelected()
 {
  try {
    if(job)
    return
  
  const response = await fetch("http://localhost:3000/api/jobs/jobSelected")
  if (response.ok)
  {
    console.log("")
// return the job
  }
} catch (error) {
    console.error("some error has occurred: " ,error)
}
 }


  return { job,user };
};

export default JobApplicationVM;
