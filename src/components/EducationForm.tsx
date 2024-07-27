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
  updateEducationInfo,
  userSelector,
} from "../store/slices/userSlice";
import { EducationInfoType, EducationType } from "../store/types";
import { uniqueId } from "lodash";
import StepToggler from "../common/StepToggler";
import { educationLevels } from "../common/utils";

// const educationLevels = [
//   { label: "SSC", value: "ssc" },
//   { label: "HSC", value: "hsc" },
//   { label: "Graduation", value: "graduation" },
//   { label: "Post Graduation", value: "postGraduation" },
// ];

const EducationDetails = ({
  field,
  defaultValue,
  label,
  control,
  error,
  placeholder,
}: {
  field: string;
  defaultValue: string;
  label: string;
  control: any;
  error: string;
  placeholder?: string;
}) => {
  const getRules = () => {
    let finalRules = { required: "This field is required!" };

    if (label === "CGPA") {
      return {
        ...finalRules,
        pattern: { value: /^[0-4]\.\d\d$/, message: "Invalid CGPA!" },
      };
    }
    if (label === "Passing Year") {
      return {
        ...finalRules,
        pattern: { value: /^(19|20)\d{2}$/, message: "Invalid Year!" },
      };
    }

    return {
      required: "This field is required!",
    };
  };

  return (
    <Controller
      control={control}
      name={field}
      rules={getRules()}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <TextInput
          id={uniqueId()}
          value={value}
          label={label}
          onChange={onChange}
          error={error}
          required
          placeholder={placeholder}
        />
      )}
    />
  );
};

const EducationForm = () => {
  const dispatch = useAppDispatch();
  const educationInfo = useAppSelector(userSelector).educationInfo;

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EducationInfoType>({});

  const onSubmit: SubmitHandler<EducationInfoType> = (
    data: EducationInfoType
  ) => {
    dispatch(updateEducationInfo(data));
    dispatch(updateCurrentStep(2));
  };

  return (
    <div>
      <h1>Education</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        {educationLevels.map(
          (item: { label: string; value: string }, index: number) => (
            <div
              key={`${item.value}.institute`}
              className="flex items-center gap-4"
            >
              <div className="w-40 text-lg font-bold">{item?.label}</div>

              <EducationDetails
                field={`${item.value}.institute`}
                defaultValue={
                  educationInfo[item.value as keyof EducationInfoType]
                    ?.institute
                }
                label="School/Institute"
                control={control}
                error={
                  errors[item.value as keyof EducationInfoType]?.institute
                    ?.message || ""
                }
              />

              {/* <EducationDetails
                field={`${item.value}.board`}
                label="Board/University"
                control={control}
                error={
                  errors[item.value as keyof EducationInfoType]?.board
                    ?.message || ""
                }
              />

              <EducationDetails
                field={`${item.value}.cgpa`}
                label="CGPA"
                control={control}
                error={
                  errors[item.value as keyof EducationInfoType]?.cgpa
                    ?.message || ""
                }
                placeholder="3.50"
              />

              <EducationDetails
                field={`${item.value}.passingYear`}
                label="Passing Year"
                control={control}
                error={
                  errors[item.value as keyof EducationInfoType]?.passingYear
                    ?.message || ""
                }
                placeholder="2000"
              /> */}
            </div>
          )
        )}

        <StepToggler trigger={trigger} handleNext={handleSubmit(onSubmit)} />

        {/* <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

export default EducationForm;
