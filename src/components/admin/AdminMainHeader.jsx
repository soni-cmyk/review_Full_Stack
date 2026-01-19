import React from "react";

export default function AdminMainHeader({ title }) {
  return (
    <div>
      <p className="text-lg font-normal text-gray-500">
        {title}
      </p>
    </div>
  );
}
