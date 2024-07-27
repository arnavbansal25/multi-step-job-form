import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { uniqueId } from "lodash";

import TextInput from "../common/TextInput";
import StepToggler from "../common/StepToggler";

import { SkillsInfoType } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateSkillsInfo, userSelector } from "../store/slices/userSlice";

const SkillsForm = () => {
  const dispatch = useAppDispatch();
  const skillsInfo = useAppSelector(userSelector).skillsInfo;

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SkillsInfoType>({
    defaultValues: skillsInfo,
  });

  const {
    fields: technicalSkillsFields,
    append: appendTechnicalSkills,
    remove: removeTechnicalSkills,
  } = useFieldArray({
    name: "technicalSkills",
    control,
  });

  const {
    fields: certificationsFields,
    append: appendCertifications,
    remove: removeCertifications,
  } = useFieldArray({
    name: "certifications",
    control,
  });

  const onSubmit: SubmitHandler<SkillsInfoType> = (data: SkillsInfoType) => {
    dispatch(updateSkillsInfo(data));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold mb-4">
        Skills and Qualifications
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        <div className="flex justify-between gap-16">
          <div className="w-50">
            <div className="text-gray-700 text-md font-bold mb-2">
              Technical Skills
            </div>
            <div className="flex flex-col gap-2">
              {technicalSkillsFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <Controller
                    control={control}
                    name={`technicalSkills.${index}.value` as const}
                    rules={{
                      required: "This field is required!",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value}
                        id={uniqueId()}
                        onChange={onChange}
                        error={errors?.technicalSkills?.[index]?.value?.message}
                        required
                      />
                    )}
                  />

                  <button
                    type="button"
                    onClick={() => removeTechnicalSkills(index)}
                    className="font-bold text-lg bg-gray-200 w-10 h-10 rounded-md"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                appendTechnicalSkills({
                  label: "",
                  value: "",
                })
              }
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Add Skill
            </button>
          </div>

          <div className="">
            <div className="text-gray-700 text-md font-bold mb-2">
              Certifications
            </div>
            <div className="flex flex-col gap-2">
              {certificationsFields.map((field, index) => {
                return (
                  <div key={field.id} className="flex gap-4 items-start">
                    <Controller
                      control={control}
                      name={`certifications.${index}.value` as const}
                      rules={{
                        required: "This field is required!",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          value={value}
                          id={uniqueId()}
                          onChange={onChange}
                          error={
                            errors?.certifications?.[index]?.value?.message
                          }
                          required
                        />
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => removeCertifications(index)}
                      className="font-bold text-lg bg-gray-200 w-10 h-10 rounded-md"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() =>
                appendCertifications({
                  label: "",
                  value: "",
                })
              }
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              + Add Certification
            </button>
          </div>
        </div>

        <StepToggler trigger={trigger} handleNext={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default SkillsForm;
