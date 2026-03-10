import { useState } from "react";

export const useInputField = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (event: string) => {
    setValue(event);
  };

  return { value, handleInputChange };
};
