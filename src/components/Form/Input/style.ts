import styled from "styled-components";

export const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const StyledLabel = styled.label`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const StyledInput = styled.input`
  font-size: inherit;
  font-family: inherit;
  padding: 0.25rem;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  margin: 0.25rem 0;
  outline: none;

  // Move color code to theme later
  &:focus {
    border-color: #9803fc;
  }

  // Need to check if you can cahin both selectors
  &[data-error="true"] {
    border-color: red;
    animation: shake 0.2s;
  }

  &:invalid[data-blurred="true"] {
    border-color: red;
    animation: shake 0.2s;
  }

  @keyframes shake {
    25% {
      transform: translateX(4px);
    }
    50% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }
`;

export const StyledError = styled.span`
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: red;
  max-width: 250px;
  display: none;

  // Need to check if you can chain both selectors
  ${StyledInput}[data-error="true"] ~ & {
    display: block;
  }

  ${StyledInput}:invalid[data-blurred="true"] ~ & {
    display: block;
  }
`;
