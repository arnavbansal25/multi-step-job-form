import React from "react";
import { uniqueId } from "lodash";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import TextInput from "../common/TextInput";
import StepToggler from "../common/StepToggler";
import { PersonalInfoType } from "../store/types";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updatePersonalInfo, userSelector } from "../store/slices/userSlice";

const PersonalInfoForm = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(userSelector).personalInfo;

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<PersonalInfoType>({
    defaultValues: personalInfo,
  });

  const onSubmit: SubmitHandler<PersonalInfoType> = (
    data: PersonalInfoType
  ) => {
    dispatch(updatePersonalInfo(data));
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold mb-4">
        Personal Information
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 py-6 flex flex-col gap-4"
      >
        <Controller
          control={control}
          name="name"
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
          rules={{
            required: "This field is required!",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Invalid phone number!",
            },
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
      </form>
    </div>
  );
};

export default PersonalInfoForm;
