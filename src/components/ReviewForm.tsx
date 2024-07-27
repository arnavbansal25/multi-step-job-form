import React from "react";

import StepToggler from "../common/StepToggler";

import { useAppSelector } from "../store/hooks";
import { educationLevels } from "../common/utils";
import { EducationInfoType } from "../store/types";
import { userSelector } from "../store/slices/userSlice";

const AdditionalInfoForm = () => {
  const store = useAppSelector(userSelector);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl text-center font-extrabold leading-none text-blue-700">
        Review and Submit
      </h1>

      <section>
        <div className="text-2xl font-semibold">Personal Information</div>
        <div>
          <div>
            <span className="italic font-medium">Name:</span>{" "}
            {store?.personalInfo?.name}
          </div>
          <div>
            <span className="italic font-medium">Email:</span>{" "}
            {store?.personalInfo?.email}
          </div>
          <div>
            <span className="italic font-medium">Phone Number:</span>{" "}
            {store?.personalInfo?.phone}
          </div>
          <div>
            <span className="italic font-medium">Address:</span>{" "}
            {store?.personalInfo?.address}
          </div>
        </div>
      </section>

      <section>
        <div className="text-2xl font-semibold">Education</div>
        <table className="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                </td>
                <td className="px-6 py-4">
                  {
                    store.educationInfo[item.value as keyof EducationInfoType]
                      ?.board
                  }
                </td>
                <td className="px-6 py-4">
                  {
                    store.educationInfo[item.value as keyof EducationInfoType]
                      ?.cgpa
                  }
                </td>
                <td className="px-6 py-4">
                  {
                    store.educationInfo[item.value as keyof EducationInfoType]
                      ?.passingYear
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <div className="text-2xl font-semibold mb-1">Work Experience</div>
        {store?.workInfo?.workExp.length === 0 ? (
          "None"
        ) : (
          <table className="w-fit text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Job Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration (in months)
                </th>
              </tr>
            </thead>
            <tbody>
              {store?.workInfo?.workExp.map((item, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{item?.companyName}</td>
                  <td className="px-6 py-4">{item?.jobTitle}</td>
                  <td className="px-6 py-4">{item?.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <div className="text-2xl font-semibold">Skills and Qualifications</div>
        <div className="italic font-medium">Skills</div>
        {store?.skillsInfo?.technicalSkills?.map((v) => v.value).join(", ") ||
          "None"}

        <div className="italic font-medium mt-2">Certifications</div>
        {store?.skillsInfo?.certifications?.map((v) => v.value).join(", ") ||
          "None"}
      </section>

      <section>
        <div className="text-2xl font-semibold">Additions Information</div>
        <div className="italic font-medium">Cover Letter</div>
        <div>{store?.additionalInfo?.coverLetter || "None"}</div>

        <div className="italic font-medium mt-2">Resume</div>
        <div>{store?.additionalInfo?.resume || "None"}</div>
      </section>

      <StepToggler />
    </div>
  );
};

export default AdditionalInfoForm;
