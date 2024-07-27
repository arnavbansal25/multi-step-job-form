import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import TextInput from "../common/TextInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  updateCurrentStep,
  updatePersonalInfo,
  userSelector,
} from "../store/slices/userSlice";
import { PersonalInfoType } from "../store/types";
import { uniqueId } from "lodash";
import StepToggler from "../common/StepToggler";

const PersonalInfoForm = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(userSelector).personalInfo;

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PersonalInfoType>();

  const onSubmit: SubmitHandler<PersonalInfoType> = (
    data: PersonalInfoType
  ) => {
    dispatch(updatePersonalInfo(data));
    dispatch(updateCurrentStep(1));
  };

  return (
    <div>
      <h1>Personal Information</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        <Controller
          control={control}
          name="name"
          defaultValue={personalInfo?.name}
          rules={{
            required: "This field is required!",
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              label="Name"
              id={uniqueId()}
              onChange={onChange}
              error={errors?.name?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          defaultValue={personalInfo?.email}
          rules={{
            required: "This field is required!",
            pattern: {
              value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
              message: "Invalid email!",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              label="Email"
              id={uniqueId()}
              onChange={onChange}
              error={errors?.email?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          defaultValue={personalInfo?.phone}
          rules={{
            required: "This field is required!",
            pattern: { value: /^[6-9]\d{9}$/, message: "Invalid number!" },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              label="Phone Number"
              id={uniqueId()}
              onChange={onChange}
              error={errors?.phone?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          defaultValue={personalInfo?.address}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              label="Address"
              id={uniqueId()}
              onChange={onChange}
              error={errors?.address?.message}
            />
          )}
        />

        <StepToggler trigger={trigger} handleNext={handleSubmit(onSubmit)} />

        {/* <div className="flex justify-end">
        <button
          type="submit"
          className="w-fit  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div> */}
      </form>
    </div>
  );
};

export default PersonalInfoForm;
