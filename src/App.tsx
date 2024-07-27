import React, { useEffect, useState } from "react";
import "./App.css";
import PersonalInfoForm from "./components/PersonalInfoForm";
import EducationForm from "./components/EducationForm";
import WorkExperienceForm from "./components/WorkExperienceForm";
import SkillsForm from "./components/SkillsForm";
import AdditionalInfoForm from "./components/AdditionalInfoForm";
import { useAppSelector } from "./store/hooks";
import { userSelector } from "./store/slices/userSlice";
import ReviewForm from "./components/ReviewForm";

const steps = [
  "Personal Information",
  "Education",
  "Work Experience",
  "Skills and Qualifications",
  "Additional Information",
  "Review and Submit Application",
];

function App() {
  const currentStep = useAppSelector(userSelector)?.currentStep;

  console.log("44", currentStep);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  }, []);

  return (
    <div className="m-4">
      {
        {
          0: <PersonalInfoForm />,
          1: <EducationForm />,
          2: <WorkExperienceForm />,
          3: <SkillsForm />,
          4: <AdditionalInfoForm />,
          5: <ReviewForm />,
        }[currentStep]
      }
    </div>
  );
}

export default App;
