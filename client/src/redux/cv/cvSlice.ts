import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ממשקי הנתונים
interface PersonalInformationState {
    userId: string;
    jobId: string;
    jobName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
}

interface EducationState {
    id: number;
    institution: string;
    degree: string;
    studyYears: string;
}

interface WorkExperienceState {
    id: number;
    jobName: string;
    jobTitle: string;
    jobType: string;
    startDate: string;
    endDate?: string;
    responsibility: string;
}

interface ServiceState {
    id: string;
    serviceType: string;
    organizationName: string;
    serviceYears: string;
}

interface SkillsState {
    technicalSkills: string;
    spokenLanguages: string;
    _id: string;
}

// המבנה הכללי של ה-state
interface CvState {
    personalInformation: PersonalInformationState;
    professionalSummary: string;
    educations: EducationState[];
    workExperience: WorkExperienceState[];
    serviceType: ServiceState[];
    skills: SkillsState[];
    loading: boolean;
    error: string | null;
}

// מצב התחלתי
const initialState: CvState = {
    personalInformation: {
        userId: crypto.randomUUID(),
        jobId: "",
        jobName: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
    },
    professionalSummary: "",
    educations: [],
    workExperience: [],
    serviceType: [],
    skills: [],
    loading: false,
    error: null,
};

const cvSlice = createSlice({
    name: "cv",
    initialState,
    reducers: {
        
        updatePersonalInformation(state, action: PayloadAction<Partial<PersonalInformationState>>) {
            state.personalInformation = { ...state.personalInformation, ...action.payload };
        },
        updateProfessionalSummary(state, action: PayloadAction<string>) {
            state.professionalSummary = action.payload;
        },
        addEducation(state) {
            const newEducation: EducationState = {
                id: Date.now(),
                institution: "",
                degree: "",
                studyYears: "",
            };
            state.educations.push(newEducation);
        },
        updateEducation(state, action: PayloadAction<{ id: number, data: Partial<EducationState> }>) {
            const index = state.educations.findIndex((edu) => edu.id === action.payload.id);
            if (index !== -1) {
                state.educations[index] = { ...state.educations[index], ...action.payload.data };
            }
        },

        getEducationFromServer(state, action: PayloadAction<EducationState[]>){
            state.educations = action.payload;
        },

        removeEducation(state, action: PayloadAction<number>) {
            state.educations = state.educations.filter((edu) => edu.id !== action.payload);
        },
        addWorkExperience(state) {
            const newExperience: WorkExperienceState = {
                id: Date.now(),
                jobName: "",
                jobTitle: "",
                jobType: "",
                startDate: "",
                endDate: "",
                responsibility: "",
            };
            state.workExperience.push(newExperience);
        },
        updateWorkExperience(state, action: PayloadAction<{ id: number, data: Partial<WorkExperienceState> }>) {
            const index = state.workExperience.findIndex((exp) => exp.id === action.payload.id);
            if (index !== -1) {
                state.workExperience[index] = { ...state.workExperience[index], ...action.payload.data };
            }
        },

        getWorkExperienceFromServer(state, action: PayloadAction<WorkExperienceState[]>){
            state.workExperience = action.payload;
        },

        removeWorkExperience(state, action: PayloadAction<number>) {
            state.workExperience = state.workExperience.filter((exp) => exp.id !== action.payload);
        },
        addServiceType(state) {
            const newService: ServiceState = {
                id: crypto.randomUUID(),
                serviceType: "",
                organizationName: "",
                serviceYears: "",
            };
            state.serviceType.push(newService);
        },
        updateServiceType(state, action: PayloadAction<{ id: string, data: Partial<ServiceState> }>) {
            const index = state.serviceType.findIndex((service) => service.id === action.payload.id);
            if (index !== -1) {
                state.serviceType[index] = { ...state.serviceType[index], ...action.payload.data };
            }
        },

        getServiceTypesFromServer(state, action: PayloadAction<ServiceState[]>){
            state.serviceType = action.payload;
        },

        removeServiceType(state, action: PayloadAction<string>) {
            state.serviceType = state.serviceType.filter((service) => service.id !== action.payload);
        },
        addSkills(state) {
            const newSkills: SkillsState = {
                _id: crypto.randomUUID(),
                technicalSkills: "",
                spokenLanguages: "",
            };
            state.skills.push(newSkills);
        },
        
        removeSkills(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((skill) => skill._id !== action.payload);
        },
        updateSkills(state, action: PayloadAction<{ id: string; field: keyof SkillsState; value: string }>) {
            const index = state.skills.findIndex(skill => skill._id === action.payload.id);
            if (index !== -1) {
                state.skills[index] = { 
                    ...state.skills[index], 
                    [action.payload.field]: action.payload.value 
                };
            }
        },

        getSkillsFromServer(state, action: PayloadAction<SkillsState[]>) {
            state.skills = action.payload; // מחליף את המערך הקיים עם המידע שמגיע מהשרת
        },
        
    },
    
    
});

export const {
    updatePersonalInformation,
    updateProfessionalSummary,
    addEducation, updateEducation, removeEducation,getEducationFromServer,
    addWorkExperience, updateWorkExperience, removeWorkExperience,getWorkExperienceFromServer,
    addServiceType, updateServiceType, removeServiceType,getServiceTypesFromServer,
    addSkills, removeSkills, updateSkills,getSkillsFromServer,
} = cvSlice.actions;

export default cvSlice.reducer;
