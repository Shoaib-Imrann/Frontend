import React from "react";

export const Switch = ({ id, checked, onCheckedChange }) => {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
          checked ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </label>
  );
};
