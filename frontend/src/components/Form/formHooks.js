import { useState } from "react";

export default function useFormInput(input, initialValue, initialStatus) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState(initialStatus);

  function handleChange(e) {
    setValue(e.target.value);
    setStatus("");
  }

  return {
    placeholder: input,
    value: value,
    onChange: handleChange,
  };
}
