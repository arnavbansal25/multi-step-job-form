import React from "react";

const TextInput = ({
  value,
  label,
  id,
  onChange,
  error,
  required,
  placeholder,
}: {
  value: string;
  label?: string;
  id: string;
  onChange: () => void;
  error: string | undefined;
  required?: boolean;
  placeholder?: string;
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          className="text-gray-700 text-sm font-bold flex items-center gap-1"
          htmlFor={id}
        >
          {label}
          {required && <div className="text-red-500">*</div>}
        </label>
      )}
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-56 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {error && <span className="text-red-500 text-xs italic">{error}</span>}
    </div>
  );
};

export default TextInput;
