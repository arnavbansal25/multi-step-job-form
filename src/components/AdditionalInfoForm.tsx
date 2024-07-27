import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import StepToggler from "../common/StepToggler";
import { AdditionalInfoType } from "../store/types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateAdditionalInfo, userSelector } from "../store/slices/userSlice";

const AdditionalInfoForm = () => {
  const dispatch = useAppDispatch();
  const additionalInfo = useAppSelector(userSelector).additionalInfo;

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<AdditionalInfoType>({
    defaultValues: additionalInfo,
  });

  const onSubmit: SubmitHandler<AdditionalInfoType> = (
    data: AdditionalInfoType
  ) => {
    dispatch(updateAdditionalInfo(data));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold mb-4">
        Additional Information
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <div className="text-gray-700 text-md font-bold mb-2">
            Cover Letter
          </div>
          <Controller
            control={control}
            name="coverLetter"
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="coverLetter"
                  className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {value === "" ? "Select file" : "Change"}
                </label>
                {value}
                <input
                  id="coverLetter"
                  type="file"
                  onChange={onChange}
                  style={{ display: "none" }}
                />
                {errors?.coverLetter?.message && (
                  <span className="text-red-500 text-xs italic">
                    {errors?.coverLetter?.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <div className="flex flex-col">
          <div className="text-gray-700 text-md font-bold mb-2 flex items-center gap-1">
            <div>Resume</div>
            <div className="text-red-500">*</div>
          </div>
          <Controller
            control={control}
            name="resume"
            defaultValue="klklk"
            rules={{
              required: "This field is required!",
            }}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="resume"
                  className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {value === "" ? "Select file" : "Change"}
                </label>
                {value}
                <input
                  id="resume"
                  type="file"
                  onChange={onChange}
                  style={{ display: "none" }}
                />
                {errors?.resume?.message && (
                  <span className="text-red-500 text-xs italic">
                    {errors?.resume?.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <StepToggler trigger={trigger} handleNext={handleSubmit(onSubmit)} />
      </form>
    </div>
  );
};

export default AdditionalInfoForm;
