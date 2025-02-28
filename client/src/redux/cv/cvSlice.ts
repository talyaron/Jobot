import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ממשקי הנתונים
interface PersonalInformationState {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    city: string;
}

interface ProfessionalSummaryState {
    summary: string;
}

interface EducationState {
    id: number;
    institutionName: string;
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
    id: number;
    serviceType: string;
    organizationName: string;
    serviceYears: string;
}

interface SkillsState {
    id: string;
    technicalSkills: string;
    spokenLanguages: string;
}

// המבנה הכללי של ה-state
interface CvState {
    personalInformation: PersonalInformationState;
    professionalSummary: ProfessionalSummaryState;
    education: EducationState[];
    workExperience: WorkExperienceState[];
    serviceTypes: ServiceState[];
    skills: SkillsState[];
}

// מצב התחלתי
const initialState: CvState = {
    personalInformation: {
        userId: crypto.randomUUID(),
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
    },
    professionalSummary: { summary: "" },
    education: [],
    workExperience: [],
    serviceTypes: [],
    skills: [],

};

// יצירת הסלייס
const cvSlice = createSlice({
    name: "cv",
    initialState,
    reducers: {
        updatePersonalInformation(state, action: PayloadAction<Partial<PersonalInformationState>>) {
            state.personalInformation = { ...state.personalInformation, ...action.payload };
        },
        updateProfessionalSummary(state, action: PayloadAction<Partial<ProfessionalSummaryState>>) {
            state.professionalSummary = { ...state.professionalSummary, ...action.payload };
        },

        // פונקציות עבור השכלה
        addEducation(state) {
            const newEducation: EducationState = {
                id: Date.now(),
                institutionName: "",
                degree: "",
                studyYears: "",
            };
            state.education.push(newEducation);
        },
        updateEducation(state, action: PayloadAction<{ id: number, data: Partial<EducationState> }>) {
            const index = state.education.findIndex((edu) => edu.id === action.payload.id);
            if (index !== -1) {
                state.education[index] = { ...state.education[index], ...action.payload.data };
            }
        },
        removeEducation(state, action: PayloadAction<number>) {
            state.education = state.education.filter((edu) => edu.id !== action.payload);
        },

        // פונקציות עבור ניסיון תעסוקתי
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
        removeWorkExperience(state, action: PayloadAction<number>) {
            state.workExperience = state.workExperience.filter((exp) => exp.id !== action.payload);
        },

        // פונקציות עבור סוגי שירות
        addServiceType(state) {
            const newService: ServiceState = {
                id: Date.now(),
                serviceType: "",
                organizationName: "",
                serviceYears: "",
            };
            state.serviceTypes.push(newService);
        },
        updateServiceType(state, action: PayloadAction<{ id: number, data: Partial<ServiceState> }>) {
            const index = state.serviceTypes.findIndex((service) => service.id === action.payload.id);
            if (index !== -1) {
                state.serviceTypes[index] = { ...state.serviceTypes[index], ...action.payload.data };
            }
        },
        removeServiceType(state, action: PayloadAction<number>) {
            state.serviceTypes = state.serviceTypes.filter((service) => service.id !== action.payload);
        },

        addSkills(state){
            const newSkills: SkillsState = {
                id: crypto.randomUUID(),
                technicalSkills: "",
                spokenLanguages: "",
            }; 
        state.skills.push(newSkills);
    },
    removeSkills(state, action: PayloadAction<string>){
        state.skills = state.skills.filter((skill) => skill.id!== action.payload);
    },
    updateSkills(state, action: PayloadAction<{ id: string, data: Partial<SkillsState> }>) {
        const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
        if (index!== -1) {
            state.skills[index] = {...state.skills[index], ...action.payload.data };
        }
        },

        cVstate(state){
            // הפעו��ות למצב התחלתי
            state.personalInformation = initialState.personalInformation;
            state.professionalSummary = initialState.professionalSummary;
            state.education = initialState.education;
            state.workExperience = initialState.workExperience;
            state.serviceTypes = initialState.serviceTypes;
            state.skills = initialState.skills;
        },
        
    
        // ניקוי כל הנתונים
        clearCV(state) {
            state.personalInformation = initialState.personalInformation;
            state.professionalSummary = initialState.professionalSummary;
            state.education = [];
            state.workExperience = [];
            state.serviceTypes = [];
            state.skills = [];
        },
    }
});

// ייצוא הפעולות לשימוש ברכיבים
export const { 
    updatePersonalInformation,
    updateProfessionalSummary,
    addEducation,updateEducation,removeEducation, 
    addWorkExperience,updateWorkExperience,removeWorkExperience,
    addServiceType,updateServiceType,removeServiceType, 
    addSkills,removeSkills,updateSkills, 
    clearCV,cVstate,
} = cvSlice.actions;

// ייצוא ה-reducer לשימוש ב-store
export default cvSlice.reducer;
