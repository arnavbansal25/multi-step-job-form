import React from "react";
import { uniqueId } from "lodash";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import TextInput from "../common/TextInput";

import StepToggler from "../common/StepToggler";
import { educationLevels } from "../common/utils";
import { EducationInfoType } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateEducationInfo, userSelector } from "../store/slices/userSlice";

const EducationDetails = ({
  field,
  label,
  control,
  error,
  placeholder,
}: {
  field: string;
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
        pattern: { value: /^(19|20)\d{2}$/, message: "Invalid year!" },
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
  } = useForm<EducationInfoType>({ defaultValues: educationInfo });

  const onSubmit: SubmitHandler<EducationInfoType> = (
    data: EducationInfoType
  ) => {
    dispatch(updateEducationInfo(data));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold mb-4">Education</h1>

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
                label="School/Institute"
                control={control}
                error={
                  errors[item.value as keyof EducationInfoType]?.institute
                    ?.message || ""
                }
              />

              <EducationDetails
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
              />
            </div>
          )
        )}

        <StepToggler trigger={trigger} handleNext={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default EducationForm;
