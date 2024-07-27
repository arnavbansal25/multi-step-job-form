import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateCurrentStep, userSelector } from "../store/slices/userSlice";

const StepToggler = ({
  trigger = () => Promise.resolve(true),
  handleNext = () => {},
}: {
  trigger?: () => Promise<boolean>;
  handleNext?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(userSelector).currentStep;

  return (
    <div className="flex justify-between">
      <button
        disabled={currentStep === 0}
        type="button"
        onClick={async () => {
          const result = await trigger();
          if (result) {
            handleNext();
            dispatch(updateCurrentStep(currentStep - 1));
          }
        }}
        className={
          currentStep === 0
            ? "bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        }
      >
        Prev
      </button>
      {currentStep === 5 ? (
        <button
          onClick={async () => {
            alert("Form Submitted!");
          }}
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      ) : (
        <button
          onClick={async () => {
            const result = await trigger();
            console.log("5666", result);
            if (result) {
              // updateStore();
              handleNext();
              dispatch(updateCurrentStep(currentStep + 1));
            }
          }}
          className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepToggler;
