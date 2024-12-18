import React from "react";

function Spinner() {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}

export default Spinner;
