import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface InputProps {
  name: string;
  label: string;
  value?: string | ReadonlyArray<string> | number | undefined;
  required: boolean | undefined;
  type?: HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

function Input({
  label,
  name,
  type,
  required,
  placeholder,
  value,
  maxLength,
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          required={required}
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

export default Input;
