export type PersonalInfoType = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type EducationType = {
  institute: string;
  board: string;
  cgpa: string;
  passingYear: string;
};

export type EducationInfoType = {
  ssc: EducationType;
  hsc: EducationType;
  graduation: EducationType;
  postGraduation: EducationType;
};

export type WorkInfoType = {
  workExp: {
    companyName: "";
    jobTitle: "";
    duration: "";
  }[];
};

export type SkillsInfoType = {
  technicalSkills: { label: string; value: string }[];
  certifications: { label: string; value: string }[];
};

export type AdditionalInfoType = {
  coverLetter: string;
  resume: string;
};

export type UserType = {
  currentStep: number;
  personalInfo: PersonalInfoType;
  educationInfo: EducationInfoType;
  workInfo: WorkInfoType;
  skillsInfo: SkillsInfoType;
  additionalInfo: AdditionalInfoType;
};
