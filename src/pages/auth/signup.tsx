import {
  FormContainer,
  FormHeading,
  Form,
  Input,
  Button,
} from "../../components/Form";
import useForm from "../../hooks/useForm";
import { escapeRegex } from "../../utils/escapeRegex";

// TODO: Move static texts into constants
// TODO: Move regex into constants, can be used on backend aswell

const SignUp = () => {
  const { inputs, handleChange, handleError } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(inputs);
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
          pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
          errorMessage="First Name should be atleast 3 characters long"
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
          pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$"
          errorMessage="Last Name should be atleast 3 characters long"
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
          errorMessage="Please provide a valid email."
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
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          errorMessage="Password must be at least 8 characters long, include both lower and upper case characters and at least one number and symbol"
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
          errorMessage="Password don't match"
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
