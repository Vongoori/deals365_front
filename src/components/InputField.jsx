import React from "react";

export default function InputField({ label, type, name, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-gray-500 border rounded-lg focus:text-black focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}