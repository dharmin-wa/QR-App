import React from "react";
import Form from "../../shared/Form";
import LoginContainer from "../../container/login.container";

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const { handleSubmit } = LoginContainer()
  return (
    <>
      <Form onSubmit={handleSubmit}>

      </Form>
    </>

  )
};

export default Login;
