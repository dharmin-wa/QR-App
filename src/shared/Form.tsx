import React from "react";

interface FormProps {
  children: React.ReactNode
  onSubmit: any
}

const Form = ({ children, onSubmit }: FormProps) => (
  <form onSubmit={onSubmit}>{children}</form>
);

export default Form;
