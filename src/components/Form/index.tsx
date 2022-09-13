import styled from "styled-components";
import Input from "./Input/input";
import Button from "./Button";

const FormContainer = styled.div`
  background-color: #ffffff;
  width: 28rem;
  padding: 3rem 1.5rem;
  border-radius: 0.375rem;
`;

const FormHeading = styled.h1`
  margin-bottom: 1rem;
`;

const Form = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit}>{children}</form>
);

export { FormContainer, FormHeading, Form, Input, Button };
