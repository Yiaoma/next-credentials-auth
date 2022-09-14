import {
  FormContainer,
  FormHeading,
  Form,
  Input,
  Button,
} from "../../components/Form";
import useForm from "../../hooks/useForm";
import { PASSWORD_REGEX } from "../../constants/regex";
import {
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
} from "../../constants/errors";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/");
  }

  const { inputs, handleChange, handleError } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await signIn("credentials", {
      redirect: false,
      email: inputs.email.value,
      password: inputs.password.value,
    });

    if (response.error) {
      return handleError({
        field: "email",
        message:
          "Email or password is incorrect, please check your information",
      });
    }

    router.push("/");
  };

  return (
    <FormContainer>
      <FormHeading>Sign In</FormHeading>
      <Form onSubmit={handleSubmit}>
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
        <Button>Login</Button>
      </Form>
    </FormContainer>
  );
};

export default SignIn;
