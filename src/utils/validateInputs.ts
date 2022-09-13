const validInput = (value: string, regexStr: string | RegExp) => {
  const regex = new RegExp(regexStr);

  return regex.test(value);
};

export const validateInputs = (inputs, res) => {
  for (let input of inputs) {
    if (!validInput(input.value, input.regex)) {
      return res.json({
        user: null,
        error: { field: input.field, message: input.message },
      });
    }
  }
};
