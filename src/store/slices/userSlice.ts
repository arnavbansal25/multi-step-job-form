import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdditionalInfoType,
  EducationInfoType,
  PersonalInfoType,
  SkillsInfoType,
  UserType,
  WorkInfoType,
} from "../types";

const educationDetails = {
  institute: "",
  board: "",
  cgpa: "",
  passingYear: "",
};

const initialState: UserType = {
  currentStep: 3,
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  educationInfo: {
    ssc: educationDetails,
    hsc: educationDetails,
    graduation: educationDetails,
    postGraduation: educationDetails,
  },
  workInfo: { workExp: [] },
  skillsInfo: {
    technicalSkills: [],
    certifications: [],
  },
  additionalInfo: {
    coverLetter: "",
    resume: "",
  },
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfoType>) => {
      state.personalInfo = action.payload;
    },
    updateEducationInfo: (state, action: PayloadAction<EducationInfoType>) => {
      state.educationInfo = action.payload;
    },
    updateWorkInfo: (state, action: PayloadAction<WorkInfoType>) => {
      state.workInfo = action.payload;
    },
    updateSkillsInfo: (state, action: PayloadAction<SkillsInfoType>) => {
      state.skillsInfo = action.payload;
    },
    updateAdditionalInfo: (
      state,
      action: PayloadAction<AdditionalInfoType>
    ) => {
      state.additionalInfo = action.payload;
    },
  },
});

export const {
  updateCurrentStep,
  updatePersonalInfo,
  updateEducationInfo,
  updateWorkInfo,
  updateSkillsInfo,
  updateAdditionalInfo,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
