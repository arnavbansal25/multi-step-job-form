import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextInput from "../common/TextInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateAdditionalInfo,
  updateCurrentStep,
  userSelector,
} from "../store/slices/userSlice";
import {
  AdditionalInfoType,
  EducationInfoType,
  EducationType,
} from "../store/types";
import { uniqueId } from "lodash";
import StepToggler from "../common/StepToggler";
import { educationLevels } from "../common/utils";

const AdditionalInfoForm = () => {
  const dispatch = useAppDispatch();

  const store = useAppSelector(userSelector);

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AdditionalInfoType>();

  const onSubmit: SubmitHandler<AdditionalInfoType> = (
    data: AdditionalInfoType
  ) => {
    dispatch(updateAdditionalInfo(data));
    dispatch(updateCurrentStep(1));
  };

  console.log("ff", store);

  const submitUser = () => {
    // localStorage.set("user", store);
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold leading-none text-blue-700">
        Review and Submit
      </h1>
      <div className="text-2xl font-semibold">Personal Information</div>
      <div>
        <div>Name: {store?.personalInfo?.name}</div>
        <div>Email: {store?.personalInfo?.email}</div>
        <div>Phone Number: {store?.personalInfo?.phone}</div>
        <div>Address: {store?.personalInfo?.address}</div>
      </div>

      <div className="text-2xl font-semibold">Education</div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Education Level
            </th>
            <th scope="col" className="px-6 py-3">
              School/Institute
            </th>
            <th scope="col" className="px-6 py-3">
              Board/University
            </th>
            <th scope="col" className="px-6 py-3">
              CGPA
            </th>
            <th scope="col" className="px-6 py-3">
              Passing Year
            </th>
          </tr>
        </thead>
        <tbody>
          {educationLevels?.map((item, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{item?.label}</td>
              <td className="px-6 py-4">
                {
                  store.educationInfo[item.value as keyof EducationInfoType]
                    ?.institute
                }
                a
              </td>
              <td className="px-6 py-4">
                {
                  store.educationInfo[item.value as keyof EducationInfoType]
                    ?.board
                }
                b
              </td>
              <td className="px-6 py-4">
                {" "}
                {
                  store.educationInfo[item.value as keyof EducationInfoType]
                    ?.cgpa
                }
                c
              </td>
              <td className="px-6 py-4">
                {" "}
                {
                  store.educationInfo[item.value as keyof EducationInfoType]
                    ?.passingYear
                }
                d
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-2xl font-semibold mt-10">Work Experience</div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Job Title
            </th>
            <th scope="col" className="px-6 py-3">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {store?.workInfo?.workExp.map((item, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{item?.companyName}b</td>
              <td className="px-6 py-4">{item?.jobTitle}c</td>
              <td className="px-6 py-4">{item?.duration}d</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-2xl font-semibold">Skills and Qualifications</div>
      <div>Skills</div>
      {store?.skillsInfo?.technicalSkills?.map((item, index) => (
        <div key={index}>{item?.value}</div>
      ))}

      <div>Certifications</div>
      {store?.skillsInfo?.certifications?.map((item, index) => (
        <div key={index}>{item?.value}</div>
      ))}

      <div className="text-2xl font-semibold">Additions Information</div>
      <div>Cover Letter</div>
      <div>{store?.additionalInfo?.coverLetter || "None"}</div>

      <div>Resume</div>
      <div>{store?.additionalInfo?.resume || "None"}</div>

      <StepToggler handleNext={submitUser} />
    </div>
  );
};

export default AdditionalInfoForm;
