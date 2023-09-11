import React from "react";

interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  children: React.ReactNode;
  onSubmit: any;
}

const Form = ({ children, onSubmit, ...props }: FormProps) => (
  <form onSubmit={onSubmit} {...props}>
    {children}
  </form>
);

export default Form;
