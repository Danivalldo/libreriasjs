import React from "react";

const Attempts = ({ attempts, maxAttempts }) => {
  return (
    <div>
      {attempts} / {maxAttempts}
    </div>
  );
};

export default Attempts;
