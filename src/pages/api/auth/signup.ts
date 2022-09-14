import { NextApiRequest, NextApiResponse } from "next";
import { validateInputs } from "../../../utils/validateInputs";
import { prisma } from "../../../server/database/client";
import * as argon2 from "argon2";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
} from "../../../constants/regex";
import {
  EMAIL_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from "../../../constants/errors";

const SignUp = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(404).send("Oops who are you?");
  }

  const { firstName, lastName, email, password } = JSON.parse(req.body);

  validateInputs(
    [
      {
        value: firstName.trim(),
        regex: NAME_REGEX,
        field: "firstName",
        message: NAME_ERROR_MESSAGE,
      },
      {
        value: lastName.trim(),
        regex: NAME_REGEX,
        field: "lastName",
        message: NAME_ERROR_MESSAGE,
      },
      {
        value: email.trim(),
        regex: EMAIL_REGEX,
        field: "email",
        message: EMAIL_ERROR_MESSAGE,
      },
      {
        value: password,
        regex: PASSWORD_REGEX,
        field: "password",
        message: PASSWORD_ERROR_MESSAGE,
      },
    ],
    res
  );

  const existingUser = await prisma.user.findFirst({
    where: {
      email: email.trim(),
    },
  });

  if (existingUser) {
    return res.json({
      user: null,
      error: { field: "email", message: "Email is already taken" },
    });
  }

  const hashedPassword = await argon2.hash(password);

  // Capitalize first letters??

  const name = `${firstName.trim()} ${lastName.trim()}`;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ user, error: null });
  } catch (error) {
    return res.json({
      user: null,
      error: { field: "email", message: "Email is already taken" },
    });
  }
};

export default SignUp;
