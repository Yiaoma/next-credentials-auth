import {
  FormContainer,
  FormHeading,
  Form,
  Input,
  Button,
} from "../../components/Form";
import useForm from "../../hooks/useForm";
import { escapeRegex } from "../../utils/escapeRegex";
import { NAME_REGEX, PASSWORD_REGEX } from "../../constants/regex";
import {
  NAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
} from "../../constants/errors";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const SignUp = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) router.push("/");

  const { inputs, handleChange, handleError } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName: inputs.firstName.value,
        lastName: inputs.lastName.value,
        email: inputs.email.value,
        password: inputs.password.value,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return handleError(data.error);
    }

    router.push("/auth/signin");
  };

  return (
    <FormContainer>
      <FormHeading>Sign Up</FormHeading>
      <Form onSubmit={handleSubmit}>
        <Input
          name="firstName"
          type="text"
          label="First Name"
          value={inputs.firstName.value}
          pattern={NAME_REGEX}
          errorMessage={NAME_ERROR_MESSAGE}
          onChange={handleChange}
          placeholder="eg. John"
          error={inputs.firstName.error}
          required={true}
        />
        <Input
          name="lastName"
          type="text"
          label="Last Name"
          value={inputs.lastName.value}
          pattern={NAME_REGEX}
          errorMessage={NAME_ERROR_MESSAGE}
          onChange={handleChange}
          placeholder="eg. Smith"
          error={inputs.lastName.error}
          required={true}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          value={inputs.email.value}
          errorMessage={EMAIL_ERROR_MESSAGE}
          onChange={handleChange}
          placeholder="eg. johnsmith@example.com"
          error={inputs.email.error}
          required={true}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          value={inputs.password.value}
          pattern={PASSWORD_REGEX}
          errorMessage={PASSWORD_ERROR_MESSAGE}
          onChange={handleChange}
          error={inputs.password.error}
          required={true}
        />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          value={inputs.confirmPassword.value}
          pattern={escapeRegex(inputs.password.value)}
          errorMessage={CONFIRM_PASSWORD_ERROR_MESSAGE}
          onChange={handleChange}
          error={inputs.confirmPassword.error}
          required={true}
        />
        <Button>Submit</Button>
      </Form>
    </FormContainer>
  );
};

export default SignUp;
