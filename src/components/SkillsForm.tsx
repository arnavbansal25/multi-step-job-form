import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import TextInput from "../common/TextInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateCurrentStep,
  updateSkillsInfo,
  userSelector,
} from "../store/slices/userSlice";
import { SkillsInfoType } from "../store/types";
import { uniqueId } from "lodash";
import StepToggler from "../common/StepToggler";

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

  console.log("43", control);

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
    // dispatch(updateCurrentStep(4));
  };

  console.log("44", errors);

  return (
    <div>
      <h1>Skills and Qualifications</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        <div className="flex justify-around">
          <div className="w-[40%]">
            <div className="text-gray-700 text-md font-bold mb-2">
              Technical Skills
            </div>
            <div className="flex flex-wrap gap-8">
              {technicalSkillsFields.map((field, index) => {
                return (
                  <div key={field.id} className="flex gap-2 items-start">
                    <Controller
                      control={control}
                      name={`technicalSkills.${index}.value` as const}
                      defaultValue=""
                      rules={{
                        required: "This field is required!",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          value={value}
                          id={uniqueId()}
                          onChange={onChange}
                          error={
                            errors?.technicalSkills?.[index]?.value?.message
                          }
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
                );
              })}
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

          <div className="w-[42%]">
            <div className="text-gray-700 text-md font-bold mb-2">
              Certifications
            </div>
            <div className="flex flex-wrap gap-8">
              {certificationsFields.map((field, index) => {
                return (
                  <div key={field.id} className="flex gap-4 items-start">
                    <Controller
                      control={control}
                      name={`certifications.${index}.value` as const}
                      defaultValue=""
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

        {/* <div className="flex justify-between">
        <button
          type="button"
          onClick={async () => {
            const result = await trigger();
            if (result) {
              dispatch(updateCurrentStep(2));
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Prev
        </button>
        <button
          type="submit"
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div> */}
      </form>
    </div>
  );
};

export default SkillsForm;
