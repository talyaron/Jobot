import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ממשקי הנתונים
interface PersonalInformationState {
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

// המבנה הכללי של ה-state
interface CvState {
    personalInformation: PersonalInformationState;
    professionalSummary: ProfessionalSummaryState;
    education: EducationState[];
    workExperience: WorkExperienceState[];
    serviceTypes: ServiceState[];
}

// מצב התחלתי
const initialState: CvState = {
    personalInformation: {
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
        updateEducation(state, action: PayloadAction<{ id: number; data: Partial<EducationState> }>) {
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
        updateWorkExperience(state, action: PayloadAction<{ id: number; data: Partial<WorkExperienceState> }>) {
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
        updateServiceType(state, action: PayloadAction<{ id: number; data: Partial<ServiceState> }>) {
            const index = state.serviceTypes.findIndex((service) => service.id === action.payload.id);
            if (index !== -1) {
                state.serviceTypes[index] = { ...state.serviceTypes[index], ...action.payload.data };
            }
        },
        removeServiceType(state, action: PayloadAction<number>) {
            state.serviceTypes = state.serviceTypes.filter((service) => service.id !== action.payload);
        },

        // ניקוי כל הנתונים
        clearCV(state) {
            state.personalInformation = initialState.personalInformation;
            state.professionalSummary = initialState.professionalSummary;
            state.education = [];
            state.workExperience = [];
            state.serviceTypes = [];
        },
    }
});

// ייצוא הפעולות לשימוש ברכיבים
export const { 
    updatePersonalInformation, 
    updateProfessionalSummary, 
    addEducation, 
    updateEducation, 
    removeEducation, 
    addWorkExperience, 
    updateWorkExperience, 
    removeWorkExperience, 
    addServiceType, 
    updateServiceType, 
    removeServiceType, 
    clearCV 
} = cvSlice.actions;

// ייצוא ה-reducer לשימוש ב-store
export default cvSlice.reducer;
