import React, { useState } from "react";

type InitialValues = {
  [key: string]: string;
};

type InputValues = {
  [key: string]: {
    value: string;
    error: string;
  };
};

type Error = {
  field: string;
  message: string;
};

const getInputValues = (initialValues: InitialValues) => {
  const inputValues: InputValues = {};

  for (let property in initialValues) {
    inputValues[property] = { value: initialValues[property], error: "" };
  }

  return inputValues;
};

const useForm = (initialValues: InitialValues) => {
  const [inputs, setValues] = useState(getInputValues(initialValues));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...inputs,
      [event.target.name]: { value: event.target.value, error: "" },
    });
  };

  const handleError = (error: Error) => {
    setValues({
      ...inputs,
      [error.field]: {
        value: inputs[error.field].value,
        error: error.message,
      },
    });
  };

  return { inputs, handleChange, handleError };
};

export default useForm;
