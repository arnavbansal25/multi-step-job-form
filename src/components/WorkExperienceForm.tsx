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
  updateWorkInfo,
  userSelector,
} from "../store/slices/userSlice";
import { WorkInfoType } from "../store/types";
import { uniqueId } from "lodash";
import StepToggler from "../common/StepToggler";

const WorkExperienceForm = () => {
  const dispatch = useAppDispatch();
  const workInfo = useAppSelector(userSelector).workInfo;

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<WorkInfoType>({
    defaultValues: workInfo,
  });

  console.log("88", control);

  const { fields, append, remove } = useFieldArray({
    name: "workExp",
    control,
  });

  const onSubmit: SubmitHandler<WorkInfoType> = (data: WorkInfoType) => {
    dispatch(updateWorkInfo(data));
    // dispatch(updateCurrentStep(3));
  };

  console.log("55", workInfo);

  return (
    <div>
      <h1>Work Experience</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex gap-4 items-end">
              <Controller
                control={control}
                name={`workExp.${index}.companyName` as const}
                rules={{
                  required: "This field is required!",
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    label="Company Name"
                    id={uniqueId()}
                    onChange={onChange}
                    error={errors?.workExp?.[index]?.companyName?.message}
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name={`workExp.${index}.jobTitle` as const}
                rules={{
                  required: "This field is required!",
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    label="Job Title"
                    id={uniqueId()}
                    onChange={onChange}
                    error={errors?.workExp?.[index]?.jobTitle?.message}
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name={`workExp.${index}.duration` as const}
                rules={{
                  required: "This field is required!",
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    label="Duration"
                    id={uniqueId()}
                    onChange={onChange}
                    error={errors?.workExp?.[index]?.duration?.message}
                    required
                  />
                )}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="font-bold text-lg bg-gray-200 w-10 h-10 rounded-md"
              >
                X
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              companyName: "",
              jobTitle: "",
              duration: "",
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          + Add Work Experience
        </button>

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

export default WorkExperienceForm;
