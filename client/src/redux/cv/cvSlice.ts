import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

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
    id: string;
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

// פעולה אסינכרונית למשיכת קורות חיים מהשרת
// export const fetchCvForm = createAsyncThunk("cvForm/fetchCvForm", async (_, { rejectWithValue }) => {
//     try {
//         const response = await axios.get("/api/cv/getCvForm", { withCredentials: true }); // 🔹 עדכון הנתיב
//         return response.data;
//     } catch (error: any) {
//         return rejectWithValue(error.response?.data || "Error fetching CV form");
//     }
// });


// יצירת הסלייס
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
                institutionName: "",
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
        removeServiceType(state, action: PayloadAction<string>) {
            state.serviceType = state.serviceType.filter((service) => service.id !== action.payload);
        },
        addSkills(state) {
            const newSkills: SkillsState = {
                id: crypto.randomUUID(),
                technicalSkills: "",
                spokenLanguages: "",
            };
            state.skills.push(newSkills);
        },
        removeSkills(state, action: PayloadAction<string>) {
            state.skills = state.skills.filter((skill) => skill.id !== action.payload);
        },
        updateSkills(state, action: PayloadAction<{ id: string, data: Partial<SkillsState> }>) {
            const index = state.skills.findIndex((skill) => skill.id === action.payload.id);
            if (index !== -1) {
                state.skills[index] = { ...state.skills[index], ...action.payload.data };
            }
        },
        clearCV(state) {
            return initialState;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchCvForm.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(fetchCvForm.fulfilled, (state, action) => {
    //             return { ...state, ...action.payload, loading: false, error: null };
    //         })
    //         .addCase(fetchCvForm.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload as string;
    //         });
    // },
    
});

export const {
    updatePersonalInformation,
    updateProfessionalSummary,
    addEducation, updateEducation, removeEducation,
    addWorkExperience, updateWorkExperience, removeWorkExperience,
    addServiceType, updateServiceType, removeServiceType,
    addSkills, removeSkills, updateSkills,
    clearCV,
} = cvSlice.actions;

export default cvSlice.reducer;
